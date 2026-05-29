export const CHART_COLORS = ['#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#94a3b8'];

export const CHART_MARGIN = { top: 8, right: 12, left: 0, bottom: 4 };

export const AXIS_TICK = { fill: '#94a3b8', fontSize: 11, fontWeight: 400 };

export const GRID_STROKE = 'rgba(148, 163, 184, 0.22)';

/** Cap bar thickness so sparse data does not render as a full-width pillar. */
export function getMaxBarSize(count, { vertical = false } = {}) {
  const n = Math.max(count, 1);
  if (vertical) {
    if (n <= 1) return 22;
    if (n <= 3) return 20;
    return 18;
  }
  if (n <= 1) return 36;
  if (n <= 4) return 32;
  if (n <= 8) return 28;
  return 22;
}

export function StatCard({ label, value, sub, tone = 'slate' }) {
  const valueTone = {
    slate: 'text-slate-800',
    amber: 'text-amber-700',
    emerald: 'text-emerald-700',
    sky: 'text-sky-700',
    rose: 'text-rose-600',
    violet: 'text-violet-700',
  }[tone] || 'text-slate-800';

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500">{label}</p>
      <p className={`mt-1.5 text-[1.65rem] font-semibold leading-tight tabular-nums ${valueTone}`}>{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-400">{sub}</p> : null}
    </div>
  );
}

export function ChartCard({ title, children, height = 240, compact = false }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h3 className="mb-3 text-[13px] font-medium text-slate-600">{title}</h3>
      <div className="w-full" style={compact ? undefined : { height }}>{children}</div>
    </div>
  );
}

export function ChartEmpty({ message = 'No data yet' }) {
  return (
    <div className="flex h-full min-h-[180px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-4 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

export function AnalyticsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      {label ? <p className="mb-1 font-medium text-slate-500">{label}</p> : null}
      {payload.map((p, i) => (
        <p key={i} className="text-slate-700">
          <span className="text-slate-500">{p.name}: </span>
          <span className="font-medium tabular-nums">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function AnalyticsPageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="m-0 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
