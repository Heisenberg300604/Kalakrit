import { mockOrders } from '../../services/mockData';
import { formatCurrency, timeAgo } from '../../lib/utils';
import { useState } from 'react';
import type { Order } from '../../types';

export default function OrdersPage() {
    const [filter, setFilter] = useState<'all' | Order['status']>('all');

    const filtered = mockOrders.filter(o => filter === 'all' || o.status === filter);

    const statusConfig = {
        pending: { color: 'badge-terracotta', icon: '⏳' },
        processing: { color: 'badge-saffron', icon: '⚙️' },
        shipped: { color: 'badge-indigo', icon: '🚚' },
        delivered: { color: 'badge-green', icon: '✅' },
    };

    const stats = [
        { label: 'Total Orders', value: mockOrders.length, icon: '📦' },
        { label: 'Pending', value: mockOrders.filter(o => o.status === 'pending').length, icon: '⏳' },
        { label: 'Shipped', value: mockOrders.filter(o => o.status === 'shipped').length, icon: '🚚' },
        { label: 'Delivered', value: mockOrders.filter(o => o.status === 'delivered').length, icon: '✅' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Orders</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Track and manage all your customer orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-[--border-warm] text-center">
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-2xl font-bold text-[--text-primary]">{s.value}</div>
                        <div className="text-xs text-[--text-secondary] mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 p-1 bg-[--warm-white] rounded-xl w-fit border border-[--border-warm] flex-wrap">
                {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'text-white shadow' : 'text-[--text-secondary] hover:text-[--terracotta]'}`}
                        style={filter === f ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Orders list */}
            <div className="space-y-3">
                {filtered.map(order => {
                    const conf = statusConfig[order.status];
                    return (
                        <div key={order.id} className="bg-white rounded-2xl p-4 border border-[--border-warm] hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <img src={order.productImage} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="font-semibold text-[--text-primary] text-sm truncate">{order.productTitle}</div>
                                            <div className="text-xs text-[--text-secondary] mt-0.5">#{order.id} • {order.customerName} • {order.customerLocation}</div>
                                            <div className="text-xs text-[--text-secondary] mt-0.5">📦 via {order.platform} • {timeAgo(order.createdAt)}</div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="font-bold text-[--terracotta] text-base">{formatCurrency(order.amount)}</div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-flex items-center gap-1 ${conf.color}`}>
                                                {conf.icon} {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="px-3 py-1.5 text-xs rounded-xl border border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] transition-all">
                                            View Details
                                        </button>
                                        {(order.status === 'processing') && (
                                            <button className="px-3 py-1.5 text-xs rounded-xl text-white font-medium" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                                Mark Shipped
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <span className="text-4xl mb-4 block">📦</span>
                    <h3 className="font-semibold text-[--text-primary]">No {filter} orders</h3>
                    <p className="text-[--text-secondary] text-sm mt-1">Orders with this status will appear here</p>
                </div>
            )}
        </div>
    );
}
