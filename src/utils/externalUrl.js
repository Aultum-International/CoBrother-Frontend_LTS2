/**
 * Normalize user-entered URLs for safe external navigation (avoids relative paths like /www.linkedin.com/...).
 */
export function normalizeExternalUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;

  return `https://${trimmed.replace(/^\/+/, '')}`;
}
