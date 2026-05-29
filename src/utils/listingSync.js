/** Cross-page listing sync (no React Query in this app). */

import { asArray } from './asArray';
import { isActiveListing } from './homepageListings';

export const ListingSyncAction = {
  DELETE: 'delete',
  INVALIDATE: 'invalidate',
};

export const ListingEntityType = {
  DOMAIN: 'domain',
  VENTURE: 'venture',
  SOFTWARE: 'software',
};

const EVENT_NAME = 'cobrother:listing-sync';
const SYNC_STORAGE_KEY = 'cobrother:listing-sync';
const TOMBSTONE_STORAGE_KEY = 'cobrother:deleted-listing-ids';

const tombstones = {
  domain: new Set(),
  venture: new Set(),
  software: new Set(),
};

function loadTombstones() {
  try {
    const raw = sessionStorage.getItem(TOMBSTONE_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.keys(tombstones).forEach((key) => {
      tombstones[key] = new Set((parsed[key] || []).map(Number));
    });
  } catch {
    // ignore
  }
}

function saveTombstones() {
  try {
    const payload = {};
    Object.keys(tombstones).forEach((key) => {
      payload[key] = [...tombstones[key]];
    });
    sessionStorage.setItem(TOMBSTONE_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function tombstoneKey(entityType) {
  if (entityType === ListingEntityType.SOFTWARE) return 'software';
  if (entityType === ListingEntityType.VENTURE) return 'venture';
  return 'domain';
}

export function markListingDeleted(entityType, id) {
  const numericId = Number(id);
  if (!numericId) return;
  const key = tombstoneKey(entityType);
  tombstones[key].add(numericId);
  saveTombstones();
}

export function isListingTombstoned(entityType, id) {
  const numericId = Number(id);
  if (!numericId) return false;
  return tombstones[tombstoneKey(entityType)].has(numericId);
}

loadTombstones();

export function emitListingSync(detail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }));
  try {
    localStorage.setItem(
      SYNC_STORAGE_KEY,
      JSON.stringify({ ...detail, ts: Date.now() }),
    );
  } catch {
    // ignore
  }
}

export function emitListingDeleted(entityType, id) {
  const numericId = Number(id);
  if (!numericId) return;
  markListingDeleted(entityType, numericId);
  emitListingSync({
    action: ListingSyncAction.DELETE,
    entityType,
    id: numericId,
  });
}

export function emitListingInvalidate(entityType) {
  emitListingSync({
    action: ListingSyncAction.INVALIDATE,
    entityType: entityType || null,
  });
}

export function subscribeListingSync(listener) {
  if (typeof window === 'undefined') return () => {};

  const handler = (event) => listener(event.detail);
  window.addEventListener(EVENT_NAME, handler);

  const onStorage = (storageEvent) => {
    if (storageEvent.key !== SYNC_STORAGE_KEY || !storageEvent.newValue) return;
    try {
      const detail = JSON.parse(storageEvent.newValue);
      if (detail?.action === ListingSyncAction.DELETE && detail.entityType && detail.id) {
        markListingDeleted(detail.entityType, detail.id);
      }
      listener(detail);
    } catch {
      // ignore
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', onStorage);
  };
}

export function matchesDomainListing(item, domainId) {
  const id = Number(domainId);
  if (!id) return false;
  if (Number(item?.id) === id) return true;
  if (Number(item?.domain?.id) === id) return true;
  const auction = item?.auction ?? item;
  if (Number(auction?.domain?.id) === id) return true;
  return false;
}

/** Admin API returns soft-deleted rows (status=false); hide them in the UI. */
export function normalizeAdminTabData(tab, data) {
  const rows = asArray(data);

  switch (tab) {
    case 'domains':
      return rows.filter(
        (item) => isActiveListing(item, 'domain')
          && !isListingTombstoned(ListingEntityType.DOMAIN, item.id),
      );
    case 'cocreations':
      return rows.filter(
        (item) => isActiveListing(item, 'software')
          && !isListingTombstoned(ListingEntityType.SOFTWARE, item.id),
      );
    case 'auctions':
      return rows.filter((item) => {
        const auction = item.auction ?? item;
        const domain = auction.domain || item.domain || {};
        const domainId = domain.id ?? item.domainId;
        if (isListingTombstoned(ListingEntityType.DOMAIN, domainId)) return false;
        return isActiveListing(domain, 'domain');
      });
    case 'domain-enquiries':
      return rows.filter((enquiry) => {
        const domain = enquiry.domain || {};
        const domainId = domain.id;
        if (isListingTombstoned(ListingEntityType.DOMAIN, domainId)) return false;
        return isActiveListing(domain, 'domain');
      });
    default:
      return rows;
  }
}
