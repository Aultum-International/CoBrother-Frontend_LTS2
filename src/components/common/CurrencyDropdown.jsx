import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { CURRENCY_LABELS } from '../../constants/currencies';

/**
 * Shared currency selector (TopNavbar dark bar + AppLayout light).
 */
export default function CurrencyDropdown({ variant = 'dark', className = '' }) {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const isDark = variant === 'dark';

  const triggerCls = isDark
    ? 'text-white text-xs md:text-sm font-normal no-underline flex items-center gap-1 px-2 sm:px-2.5 md:px-3 py-1.5 rounded transition-colors duration-200 cursor-pointer bg-transparent border-none font-body hover:bg-white/15 hover:text-gray-200'
    : 'text-gray-700 text-xs sm:text-sm font-medium flex items-center gap-1 px-2.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer';

  const panelCls = isDark
    ? 'absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[140px] overflow-hidden z-[1001]'
    : 'absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[140px] overflow-hidden z-[1002]';

  return (
    <div className={`relative ${className}`.trim()} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerCls}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="truncate">{CURRENCY_LABELS[currency] || currency}</span>
        <ChevronDown size={14} className="shrink-0" />
      </button>
      {open && (
        <div className={panelCls} role="listbox">
          {supportedCurrencies.map((code) => (
            <button
              type="button"
              key={code}
              onClick={() => {
                setCurrency(code);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-left text-sm cursor-pointer transition-colors ${
                currency === code
                  ? 'bg-purple-50 text-purple-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {CURRENCY_LABELS[code] || code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
