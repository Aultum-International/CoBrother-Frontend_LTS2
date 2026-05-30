import { resolveDomainDisplay } from './domainDisplay';
import { isPremiumDomain } from './domainPricing';

function formatTickerOwner(listedBy) {
  if (!listedBy) return 'Verified seller';
  const handle = [listedBy.firstname, listedBy.lastname]
    .filter(Boolean)
    .join('')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  if (handle) return `@${handle}`;
  const emailHandle = listedBy.email?.split('@')[0]?.toLowerCase();
  return emailHandle ? `@${emailHandle}` : 'Verified seller';
}

function mapDomainStatus(domainStatus) {
  return String(domainStatus || 'AVAILABLE').toUpperCase() === 'SOLD' ? 'sold' : 'unsold';
}

/** Map a domain listing row to compact ticker card shape. */
export function mapDomainToTickerItem(domain) {
  const display = resolveDomainDisplay(domain);
  return {
    id: `domain-${domain.id}`,
    domain: display.fullDomain,
    status: mapDomainStatus(domain.domainStatus),
    owner: formatTickerOwner(domain.listedBy),
    askingPrice: domain.askingPrice,
  };
}

/** Pick latest active marketplace domains for the hero ticker. */
export function selectDomainTickerItems(domains, limit = 6) {
  const rows = Array.isArray(domains) ? domains : [];
  return rows
    .filter((d) => d && !d.takenDown && d.status !== false && !isPremiumDomain(d))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit)
    .map(mapDomainToTickerItem);
}
