import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { analyticsAPI } from '../api/services';
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

export default function VentureAnalyticsPage() {
  const navigate = useNavigate();
  const [ventures, setVentures] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    analyticsAPI.getMyVentures()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : [];
        setVentures(list);
        if (list.length > 0) setSelected(list[0].id);
      })
      .catch(() => setError('Failed to load ventures.'))
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    setError('');
    analyticsAPI.getVentureAnalytics(selected)
      .then(({ data }) => setAnalytics(data))
      .catch(() => setError('Failed to load analytics.'))
      .finally(() => setLoading(false));
  }, [selected]);

  const viewsData = analytics
    ? Object.entries(analytics.viewsByDay).map(([date, count]) => ({
        date: date.length > 10 ? date.slice(5) : date,
        Views: count,
      }))
    : [];

  const industryData = analytics
    ? Object.entries(analytics.byIndustry).map(([name, value]) => ({
        name: name.replace(/_/g, ' '),
        value,
      }))
    : [];

  const roleData = analytics
    ? Object.entries(analytics.byRole).map(([name, value]) => ({
        name: name.replace(/_/g, ' '),
        value,
      }))
    : [];

  const skillsData = analytics
    ? Object.entries(analytics.applicantSkills)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value]) => ({ name, value }))
    : [];

  const statusData = analytics
    ? Object.entries(analytics.byStatus).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <AppLayout>
      <AnalyticsPageHeader
        title="Venture Analytics"
        description="Track performance and applicant insights for your ventures."
        action={(
          <button type="button" className="btn-glow btn-glow-sm" onClick={() => navigate('/ventures')}>
            ← Back
          </button>
        )}
      />

      {!fetching && ventures.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {ventures.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v.id)}
              className={`btn-glow btn-glow-sm text-sm font-medium ${
                selected === v.id ? 'bg-slate-800 text-white border-slate-800' : ''
              }`}
            >
              {v.brandDetails?.brandName || `Venture #${v.id}`}
            </button>
          ))}
        </div>
      )}

      {fetching || loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600">{error}</div>
      ) : !analytics ? null : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <StatCard label="Total Views" value={analytics.totalViews} sub="All time" tone="amber" />
            <StatCard label="Applications" value={analytics.totalApplications} sub="All time" tone="emerald" />
            <StatCard label="Conversion Rate" value={`${analytics.conversionRate}%`} sub="Views → applications" tone="sky" />
            <StatCard label="Avg Time to Apply" value={`${analytics.avgHoursToApply}h`} sub="After first view" tone="rose" />
          </div>

          <ChartCard title="Views over last 30 days">
            {viewsData.length === 0 ? (
              <ChartEmpty />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData} margin={{ ...CHART_MARGIN, left: 4, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="date" tick={AXIS_TICK} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                  <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} width={36} />
                  <Tooltip content={<AnalyticsTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="Views"
                    stroke="#a78bfa"
                    strokeWidth={1.75}
                    dot={{ r: 2.5, fill: '#a78bfa', strokeWidth: 0 }}
                    activeDot={{ r: 4, fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="Viewer industries">
              {industryData.length === 0 ? (
                <ChartEmpty />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={industryData.length > 1 ? 2 : 0}
                      label={({ name, percent }) =>
                        percent > 0.06 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                      }
                      labelLine={false}
                      fontSize={10}
                    >
                      {industryData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip content={<AnalyticsTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Viewer roles">
              {roleData.length === 0 ? (
                <ChartEmpty />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={roleData}
                    layout="vertical"
                    margin={{ ...CHART_MARGIN, left: 8 }}
                    barCategoryGap="28%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                    <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={AXIS_TICK}
                      axisLine={false}
                      tickLine={false}
                      width={96}
                    />
                    <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                    <Bar
                      dataKey="value"
                      fill="#93c5fd"
                      radius={[0, 4, 4, 0]}
                      name="Viewers"
                      maxBarSize={getMaxBarSize(roleData.length, { vertical: true })}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          <ChartCard title="Top applicant skills" height={220}>
            {skillsData.length === 0 ? (
              <ChartEmpty message="No applicants yet" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData} margin={CHART_MARGIN} barCategoryGap="35%">
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="name" tick={AXIS_TICK} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} width={36} />
                  <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                  <Bar dataKey="value" name="Applicants" radius={[4, 4, 0, 0]} maxBarSize={getMaxBarSize(skillsData.length)}>
                    {skillsData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Application status" compact>
            {statusData.length === 0 ? (
              <ChartEmpty message="No applications yet" />
            ) : (
              <div className="flex flex-wrap gap-3">
                {statusData.map((s) => {
                  const meta = {
                    PENDING: { valueClass: 'text-amber-700', bg: 'bg-amber-50' },
                    APPROVED: { valueClass: 'text-emerald-700', bg: 'bg-emerald-50' },
                    REJECTED: { valueClass: 'text-rose-600', bg: 'bg-rose-50' },
                  };
                  const m = meta[s.name] || { valueClass: 'text-slate-700', bg: 'bg-slate-50' };
                  return (
                    <div
                      key={s.name}
                      className={`min-w-[108px] flex-1 rounded-lg border border-slate-200/80 px-4 py-3 text-center ${m.bg}`}
                    >
                      <p className={`text-xl font-semibold tabular-nums ${m.valueClass}`}>{s.value}</p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">{s.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </ChartCard>
        </div>
      )}

      {!fetching && ventures.length === 0 && (
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-3" aria-hidden>📊</p>
            <h3 className="mb-2 font-display text-xl font-semibold text-slate-900">No ventures listed yet</h3>
            <p className="mb-5 text-sm text-slate-500">List a venture to start tracking analytics.</p>
            <button type="button" className="btn-glow" onClick={() => navigate('/ventures/new')}>
              List a Venture
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
