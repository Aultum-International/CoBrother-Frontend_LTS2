import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { currencyAPI } from '../api/services';

const STORAGE_KEY = 'cobrother_currency';
const DEFAULT_CURRENCY = 'INR';

const FALLBACK = {
  INR: { symbol: '₹', rateFromInr: 1 },
  USD: { symbol: '$', rateFromInr: 0.0118 },
  EUR: { symbol: '€', rateFromInr: 0.0109 },
  GBP: { symbol: '£', rateFromInr: 0.0094 },
  AED: { symbol: 'د.إ', rateFromInr: 0.0433 },
  SGD: { symbol: 'S$', rateFromInr: 0.0158 },
  AUD: { symbol: 'A$', rateFromInr: 0.0181 },
  CAD: { symbol: 'C$', rateFromInr: 0.0162 },
};

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && FALLBACK[saved] ? saved : DEFAULT_CURRENCY;
  });
  const [meta, setMeta] = useState(FALLBACK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    currencyAPI
      .getSupported()
      .then(({ data }) => {
        const next = {};
        (data?.currencies || []).forEach((row) => {
          next[row.code] = { symbol: row.symbol, rateFromInr: row.rateFromInr };
        });
        if (Object.keys(next).length > 0) setMeta(next);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const setCurrency = useCallback((code) => {
    const upper = (code || DEFAULT_CURRENCY).toUpperCase();
    if (!meta[upper] && !FALLBACK[upper]) return;
    setCurrencyState(upper);
    localStorage.setItem(STORAGE_KEY, upper);
  }, [meta]);

  const convertFromInr = useCallback(
    (inrAmount) => {
      const inr = Number(inrAmount) || 0;
      if (currency === 'INR') return inr;
      const rate = meta[currency]?.rateFromInr ?? FALLBACK[currency]?.rateFromInr ?? 1;
      const converted = inr * rate;
      return Math.round(converted * 100) / 100;
    },
    [currency, meta],
  );

  const formatPrice = useCallback(
    (inrAmount) => {
      const amt = convertFromInr(inrAmount);
      const sym = meta[currency]?.symbol ?? FALLBACK[currency]?.symbol ?? `${currency} `;
      const fractionDigits = Number.isInteger(amt) ? 0 : 2;
      return `${sym}${amt.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })}`;
    },
    [currency, meta, convertFromInr],
  );

  const formatMajor = useCallback(
    (amount, code = currency) => {
      const sym = meta[code]?.symbol ?? FALLBACK[code]?.symbol ?? `${code} `;
      return `${sym}${Number(amount || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [currency, meta],
  );

  const getSymbol = useCallback(
    (code = currency) => meta[code]?.symbol ?? FALLBACK[code]?.symbol ?? `${code} `,
    [currency, meta],
  );

  const supportedCurrencies = useMemo(
    () => Object.keys(meta).length ? Object.keys(meta) : Object.keys(FALLBACK),
    [meta],
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      symbol: meta[currency]?.symbol ?? FALLBACK[currency]?.symbol ?? currency,
      formatPrice,
      formatMajor,
      getSymbol,
      convertFromInr,
      supportedCurrencies,
      loaded,
    }),
    [currency, setCurrency, meta, formatPrice, formatMajor, getSymbol, convertFromInr, supportedCurrencies, loaded],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return ctx;
}

export default useCurrency;
