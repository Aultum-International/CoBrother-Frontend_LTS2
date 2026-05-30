const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Local YYYY-MM-DD for `<input type="date">` min/default values. */
export function toLocalIsoDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Format stored Available From values for display.
 * ISO dates (YYYY-MM-DD) are formatted in local time without year drift.
 * Free-text values (e.g. "Immediately", legacy entries) are shown as stored.
 */
export function formatAvailableFromDate(value) {
  if (!value || typeof value !== 'string') return '—';

  const trimmed = value.trim();
  if (!trimmed) return '—';

  const iso = ISO_DATE.exec(trimmed);
  if (iso) {
    const [, year, month, day] = iso;
    const local = new Date(Number(year), Number(month) - 1, Number(day));
    if (Number.isNaN(local.getTime())) return trimmed;
    return local.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // Avoid `new Date()` on ambiguous strings like "June 12" (can default to 2001).
  return trimmed;
}
