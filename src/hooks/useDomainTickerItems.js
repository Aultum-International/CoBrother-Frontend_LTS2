import { useEffect, useState } from 'react';
import { domainAPI } from '../api/services';
import { asArray } from '../utils/asArray';
import { selectDomainTickerItems } from '../utils/mapDomainToTickerItem';
import { DOMAIN_TICKER_ITEMS } from '../components/home/domainTicker/mockDomainTickerData';

const TICKER_POOL_SIZE = 6;

/**
 * Loads live domain listings for the homepage ticker.
 * Falls back to mock rows only when the API is empty/unavailable (preserves layout).
 */
export function useDomainTickerItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    domainAPI
      .getAll()
      .then(({ data }) => {
        if (cancelled) return;
        const picked = selectDomainTickerItems(asArray(data), TICKER_POOL_SIZE);
        setItems(picked.length > 0 ? picked : DOMAIN_TICKER_ITEMS);
      })
      .catch(() => {
        if (!cancelled) setItems(DOMAIN_TICKER_ITEMS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
