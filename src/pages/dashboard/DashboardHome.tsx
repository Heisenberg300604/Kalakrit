import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockArtisan, mockOrders, mockAnalytics, mockActivity } from '../../services/mockData';
import { formatCurrency, formatNumber, timeAgo } from '../../lib/utils';
import { Package, IndianRupee, Eye, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/AuthContext';
import supabase from '../../utils/supabase';

const StatCard = ({ icon: Icon, label, value, change, color }: { icon: React.ComponentType<{ size?: number }>; label: string; value: string; change: string; color: string }) => (
    <div className="bg-white rounded-2xl p-5 border border-[--border-warm] card-hover">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}>
                <Icon size={18} />
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.startsWith('+') ? 'badge-green' : 'badge-terracotta'}`}>{change}</span>
        </div>
        <div className="text-2xl font-bold text-[--text-primary] mt-1">{value}</div>
        <div className="text-sm text-[--text-secondary] mt-0.5">{label}</div>
    </div>
);

export default function DashboardHome() {
    const { user } = useAuth();
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        async function loadProfileName() {
            if (!user) return;
            const { data } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user.id)
                .maybeSingle();

            setProfileName(data?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Artisan');
        }

        loadProfileName();
    }, [user]);

    const firstName = profileName.split(' ')[0] || 'Artisan';
    const aiSuggestions = [
        { icon: '💰', text: 'Raise Banarasi Silk price by ₹1,200 — festival season demand is up 45%', action: 'View Pricing' },
        { icon: '📸', text: 'Add 2 more photos to Warli Painting to increase views by 180%', action: 'Edit Product' },
        { icon: '🌐', text: 'Enable Flipkart listing for Blue Pottery — 2,300 searches last week', action: 'Export Now' },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">
                        Namaste, {firstName}! 🙏
                    </h1>
                    <p className="text-[--text-secondary] text-sm mt-1">Here's what's happening with your craft business today.</p>
                </div>
                <Link to="/dashboard/voice" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                    🎙️ Add New Product
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label="Total Products" value={String(mockArtisan.totalProducts)} change="+3 this month" color="bg-orange-50 text-orange-500" />
                <StatCard icon={IndianRupee} label="Total Revenue" value={formatCurrency(mockArtisan.totalRevenue)} change="+18%" color="bg-green-50 text-green-500" />
                <StatCard icon={Eye} label="Total Views" value={formatNumber(4141)} change="+32%" color="bg-blue-50 text-blue-500" />
                <StatCard icon={ShoppingBag} label="Orders (Month)" value={String(mockArtisan.totalSales)} change="+24%" color="bg-purple-50 text-purple-500" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={mockAnalytics.salesTrend}>
                            <defs>
                                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C4622D" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#C4622D" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,98,45,0.08)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                            <Tooltip formatter={(v: number | undefined) => [formatCurrency(v ?? 0), 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid rgba(196,98,45,0.2)', background: 'rgba(255,248,240,0.95)' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#C4622D" strokeWidth={2} fill="url(#revenueGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Demand Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={mockAnalytics.demandTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(61,82,160,0.08)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(61,82,160,0.2)', background: 'rgba(255,248,240,0.95)' }} />
                            <Line type="monotone" dataKey="demand" stroke="#3D52A0" strokeWidth={2} dot={{ fill: '#3D52A0', r: 3 }} />
                            <Line type="monotone" dataKey="views" stroke="#F4A026" strokeWidth={2} dot={{ fill: '#F4A026', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Suggestions + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Suggestions */}
                <div className="lg:col-span-1 bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <div className="flex items-center gap-2 mb-4">
                        <span>🤖</span>
                        <h3 className="font-semibold text-[--text-primary]">AI Suggestions</h3>
                        <span className="ml-auto text-xs badge-saffron px-2 py-0.5 rounded-full">{aiSuggestions.length} new</span>
                    </div>
                    <div className="space-y-3">
                        {aiSuggestions.map((s, i) => (
                            <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                                <div className="flex gap-2">
                                    <span className="text-base flex-shrink-0">{s.icon}</span>
                                    <div>
                                        <p className="text-xs text-[--text-secondary] leading-relaxed">{s.text}</p>
                                        <button className="text-xs text-[--terracotta] font-semibold mt-1 hover:underline">{s.action} →</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {mockActivity.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[--warm-white] transition-colors">
                                <div className="w-9 h-9 rounded-xl bg-[--beige] flex items-center justify-center text-base flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-[--text-primary]">{item.title}</div>
                                    <div className="text-xs text-[--text-secondary] mt-0.5 truncate">{item.description}</div>
                                </div>
                                <div className="text-xs text-[--text-secondary] whitespace-nowrap ml-2">{timeAgo(item.timestamp)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[--text-primary]">Recent Orders</h3>
                    <Link to="/dashboard/orders" className="text-sm text-[--terracotta] font-medium hover:underline">View all →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs text-[--text-secondary] uppercase tracking-wide border-b border-[--border-warm]">
                                <th className="text-left pb-3 font-medium">Product</th>
                                <th className="text-left pb-3 font-medium hidden sm:table-cell">Customer</th>
                                <th className="text-left pb-3 font-medium">Platform</th>
                                <th className="text-right pb-3 font-medium">Amount</th>
                                <th className="text-right pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[--border-warm]">
                            {mockOrders.slice(0, 4).map((order) => (
                                <tr key={order.id} className="text-sm hover:bg-[--warm-white] transition-colors">
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <img src={order.productImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                            <span className="text-[--text-primary] font-medium truncate max-w-[140px] hidden md:block">{order.productTitle}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-[--text-secondary] hidden sm:table-cell">{order.customerName}</td>
                                    <td className="py-3 text-[--text-secondary]">{order.platform}</td>
                                    <td className="py-3 text-right font-semibold text-[--text-primary]">{formatCurrency(order.amount)}</td>
                                    <td className="py-3 text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.status === 'delivered' ? 'badge-green' :
                                            order.status === 'shipped' ? 'badge-indigo' :
                                                order.status === 'processing' ? 'badge-saffron' : 'badge-terracotta'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
