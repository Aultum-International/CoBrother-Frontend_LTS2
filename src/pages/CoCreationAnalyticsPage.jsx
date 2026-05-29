import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { cocreationAPI } from '../api/services';
import AppLayout from '../components/layout/AppLayout';
import {
  StatCard,
  ChartCard,
  ChartEmpty,
  AnalyticsTooltip,
  AnalyticsPageHeader,
  CHART_COLORS,
  CHART_MARGIN,
  AXIS_TICK,
  GRID_STROKE,
  getMaxBarSize,
} from '../components/analytics/AnalyticsUI';

function BreakdownList({ entries, valueClassName }) {
  if (!entries.length) return null;
  const total = entries.reduce((s, [, c]) => s + c, 0);
  return (
    <div className="flex flex-col gap-3">
      {entries
        .sort((a, b) => b[1] - a[1])
        .map(([label, count]) => {
          const pct = total ? Math.round((count / total) * 100) : 0;
          return (
            <div key={label}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="truncate text-slate-600">{label.replace(/_/g, ' ')}</span>
                <span className={`shrink-0 tabular-nums text-xs font-medium ${valueClassName}`}>
                  {count} ({pct}%)
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-violet-400/80" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default function CoCreationAnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cocreationAPI.getAnalytics(id)
      .then(({ data: analytics }) => setData(analytics))
      .catch(() => setError('Failed to load analytics.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="py-20 text-center text-sm text-rose-600">{error}</div>
      </AppLayout>
    );
  }

  if (!data) return null;

  const viewsData = Object.entries(data.viewsByDay || {}).map(([date, count]) => ({
    date: date.length > 10 ? date.slice(5) : date,
    Views: count,
  }));
  const industryEntries = Object.entries(data.byIndustry || {});
  const roleEntries = Object.entries(data.byRole || {});
  const hasViews = viewsData.some((d) => d.Views > 0);

  return (
    <AppLayout>
      <div className="max-w-[1100px]">
        <AnalyticsPageHeader
          title={data.softwareName}
          description="Analytics overview for this software listing."
          action={(
            <button type="button" className="btn-glow btn-glow-sm" onClick={() => navigate('/cocreation/dashboard')}>
              ← Dashboard
            </button>
          )}
        />

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard label="Total Views" value={data.totalViews} tone="amber" />
          <StatCard label="Total Sales" value={data.totalSales} tone="emerald" />
          <StatCard
            label="Total Revenue"
            value={`₹${Number(data.totalRevenue).toLocaleString('en-IN')}`}
            tone="emerald"
          />
          <StatCard label="Status" value={data.completionStatus || 'N/A'} tone="violet" />
        </div>

        <ChartCard title="Views — last 30 days">
          {!hasViews ? (
            <ChartEmpty message="No views yet." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData} margin={CHART_MARGIN} barCategoryGap="32%">
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="date" tick={AXIS_TICK} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} width={36} />
                <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                <Bar dataKey="Views" fill="#c4b5fd" radius={[4, 4, 0, 0]} maxBarSize={getMaxBarSize(viewsData.length)} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Viewers by industry" height={220}>
            {industryEntries.length === 0 ? (
              <ChartEmpty />
            ) : (
              <BreakdownList entries={industryEntries} valueClassName="text-violet-700" />
            )}
          </ChartCard>

          <ChartCard title="Viewers by role" height={220}>
            {roleEntries.length === 0 ? (
              <ChartEmpty />
            ) : (
              <BreakdownList entries={roleEntries} valueClassName="text-emerald-700" />
            )}
          </ChartCard>
        </div>
      </div>
    </AppLayout>
  );
}
