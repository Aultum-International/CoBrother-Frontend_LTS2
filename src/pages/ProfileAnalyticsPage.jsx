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

export default function ProfileAnalyticsPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    analyticsAPI.getProfileAnalytics()
      .then(({ data }) => setAnalytics(data))
      .catch(() => setError('No community profile found. Connect LinkedIn first.'))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <AppLayout>
      <div className="max-w-[1100px]">
        <AnalyticsPageHeader
          title="Profile Analytics"
          description="See who's viewing your community profile."
          action={(
            <button type="button" className="btn-glow btn-glow-sm" onClick={() => navigate('/community')}>
              ← Back
            </button>
          )}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600">{error}</div>
        ) : !analytics ? null : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatCard label="Total Profile Views" value={analytics.totalViews / 2} sub="All time" tone="amber" />
              <StatCard label="Views This Week" value={analytics.viewsThisWeek / 2} sub="Last 7 days" tone="emerald" />
            </div>

            <ChartCard title="Profile views — last 30 days">
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
                  <ChartEmpty message="No data yet — get more profile views!" />
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
          </div>
        )}
      </div>
    </AppLayout>
  );
}
