import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { mockAnalytics } from '../../services/mockData';
import { formatCurrency } from '../../lib/utils';

const COLORS = ['#C4622D', '#F4A026', '#3D52A0', '#7091E6'];

export default function AnalyticsDashboard() {
    const data = mockAnalytics;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Analytics</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Track your sales, demand, and customer insights</p>
            </div>

            {/* Revenue + Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[--text-primary]">Revenue & Sales Trend</h3>
                        <span className="text-xs badge-green px-2 py-1 rounded-full">+24% vs last period</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={data.salesTrend}>
                            <defs>
                                <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C4622D" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#C4622D" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F4A026" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#F4A026" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,98,45,0.07)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="revenue" orientation="left" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                            <YAxis yAxisId="sales" orientation="right" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(196,98,45,0.2)', background: 'rgba(255,248,240,0.98)' }}
                                formatter={(v: number | undefined, name: string | undefined) => [name === 'revenue' ? formatCurrency(v ?? 0) : (v ?? 0), name === 'revenue' ? 'Revenue' : 'Sales']} />
                            <Area yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#C4622D" strokeWidth={2} fill="url(#revenueGrad2)" />
                            <Area yAxisId="sales" type="monotone" dataKey="sales" stroke="#F4A026" strokeWidth={2} fill="url(#salesGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[--text-primary]">Demand & Views Trend</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={data.demandTrend}>
                            <defs>
                                <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3D52A0" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3D52A0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(61,82,160,0.07)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(61,82,160,0.2)', background: 'rgba(255,248,240,0.98)' }} />
                            <Area type="monotone" dataKey="demand" stroke="#3D52A0" strokeWidth={2} fill="url(#demandGrad)" name="Demand Score" />
                            <Area type="monotone" dataKey="views" stroke="#F4A026" strokeWidth={2} fill="none" strokeDasharray="4 2" name="Views" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Platform breakdown + Top products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Revenue by Marketplace</h3>
                    <div className="flex items-center gap-6">
                        <PieChart width={160} height={160}>
                            <Pie data={data.platformBreakdown} dataKey="revenue" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3}>
                                {data.platformBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                        </PieChart>
                        <div className="flex-1 space-y-3">
                            {data.platformBreakdown.map((p, i) => (
                                <div key={p.platform} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }}></span>
                                    <span className="text-sm text-[--text-primary] flex-1">{p.platform}</span>
                                    <span className="text-sm font-semibold text-[--text-primary]">{p.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Top Products by Revenue</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data.topProducts} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,98,45,0.07)" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: '#6B4423' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                            <YAxis type="category" dataKey="title" tick={{ fontSize: 10, fill: '#6B4423' }} axisLine={false} tickLine={false} width={100} />
                            <Tooltip formatter={(v: number | undefined) => [formatCurrency(v ?? 0), 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid rgba(196,98,45,0.2)', background: 'rgba(255,248,240,0.98)' }} />
                            <Bar dataKey="revenue" fill="#C4622D" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Customer locations */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <h3 className="font-semibold text-[--text-primary] mb-4">Customer Locations</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {data.customerLocations.map((loc, i) => {
                        const maxCount = Math.max(...data.customerLocations.map(l => l.count));
                        const pct = (loc.count / maxCount) * 100;
                        return (
                            <div key={loc.city} className="text-center">
                                <div className="relative h-20 flex items-end justify-center mb-2">
                                    <div className="w-8 rounded-t-lg transition-all" style={{ height: `${pct}%`, background: `linear-gradient(180deg, ${COLORS[i % COLORS.length]}, ${COLORS[i % COLORS.length]}99)` }}></div>
                                </div>
                                <div className="text-xs font-medium text-[--text-primary]">{loc.city}</div>
                                <div className="text-xs text-[--text-secondary]">{loc.count} orders</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
