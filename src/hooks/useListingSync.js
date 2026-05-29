import { useEffect } from 'react';
import { subscribeListingSync } from '../utils/listingSync';

/**
 * Subscribe to listing create/update/delete events from any page.
 * @param {(detail: { action: string, entityType?: string, id?: number }) => void} onSync
 */
export default function useListingSync(onSync, deps = []) {
  useEffect(() => {
    return subscribeListingSync(onSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
