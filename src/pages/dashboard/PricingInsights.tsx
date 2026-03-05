import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockPricingInsight } from '../../services/mockData';
import { formatCurrency } from '../../lib/utils';

export default function PricingInsights() {
    const p = mockPricingInsight;
    const [selectedPrice, setSelectedPrice] = useState(p.recommendedPrice);
    const [selectedProduct, setSelectedProduct] = useState('Handwoven Banarasi Silk Saree');

    const products = [
        'Handwoven Banarasi Silk Saree',
        'Blue Pottery Decorative Vase',
        'Dhokra Brass Figurine',
        'Hand-Block Printed Dupatta',
        'Warli Folk Art Panel',
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Smart Pricing Engine</h1>
                <p className="text-[--text-secondary] text-sm mt-1">AI-powered pricing intelligence based on demand, seasons, and competitor data</p>
            </div>

            {/* Product selector */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <label className="text-sm font-semibold text-[--text-secondary] mb-2 block">Select Product to Analyze</label>
                <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[--border-warm] text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all">
                    {products.map(pr => <option key={pr}>{pr}</option>)}
                </select>
            </div>

            {/* Price overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Recommended', value: formatCurrency(p.recommendedPrice), color: 'bg-green-50 text-green-700 border-green-200', highlight: true },
                    { label: 'Market Avg', value: formatCurrency(p.averagePrice), color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { label: 'Min Seen', value: formatCurrency(p.minPrice), color: 'bg-gray-50 text-gray-700 border-gray-200' },
                    { label: 'Max Seen', value: formatCurrency(p.maxPrice), color: 'bg-purple-50 text-purple-700 border-purple-200' },
                ].map(i => (
                    <div key={i.label} className={`rounded-2xl p-4 border ${i.color} ${i.highlight ? 'ring-2 ring-green-400 ring-offset-1' : ''}`}>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">{i.label}</div>
                        <div className="font-bold text-xl">{i.value}</div>
                    </div>
                ))}
            </div>

            {/* Demand score + Trend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Demand Score</h3>
                    <div className="relative flex items-center justify-center mb-3">
                        <svg viewBox="0 0 100 60" className="w-32">
                            <path d="M 10 55 A 45 45 0 0 1 90 55" fill="none" stroke="rgba(196,98,45,0.12)" strokeWidth="10" strokeLinecap="round" />
                            <path d="M 10 55 A 45 45 0 0 1 90 55" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round"
                                strokeDasharray={`${(p.demandScore / 100) * 141} 141`} />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#C4622D" />
                                    <stop offset="100%" stopColor="#F4A026" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute bottom-0 text-center">
                            <div className="text-2xl font-bold text-[--terracotta]">{p.demandScore}</div>
                            <div className="text-xs text-[--text-secondary]">/ 100</div>
                        </div>
                    </div>
                    <p className="text-xs text-center font-semibold text-green-600">🔥 High Demand</p>
                    <div className={`flex items-center gap-1 justify-center mt-2 text-xs font-semibold ${p.trendDirection === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                        {p.trendDirection === 'up' ? '📈 Trending Up' : '📉 Trending Down'}
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Price History</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <LineChart data={p.priceHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,98,45,0.08)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                            <Tooltip formatter={(v: number) => [formatCurrency(v), 'Price']} contentStyle={{ borderRadius: 12, border: '1px solid rgba(196,98,45,0.2)', background: 'rgba(255,248,240,0.95)' }} />
                            <Line type="monotone" dataKey="price" stroke="#C4622D" strokeWidth={2.5} dot={{ fill: '#C4622D', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Price Slider */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <h3 className="font-semibold text-[--text-primary] mb-2">Your Price</h3>
                <div className="flex items-center gap-4 mb-3">
                    <input type="range" min={p.minPrice} max={p.maxPrice} value={selectedPrice} onChange={e => setSelectedPrice(Number(e.target.value))}
                        className="flex-1 accent-[--terracotta]" />
                    <div className="font-bold text-[--terracotta] text-xl w-28 text-right">{formatCurrency(selectedPrice)}</div>
                </div>
                <div className="flex justify-between text-xs text-[--text-secondary]">
                    <span>Min: {formatCurrency(p.minPrice)}</span>
                    <span className="text-green-600 font-medium">✓ Recommended: {formatCurrency(p.recommendedPrice)}</span>
                    <span>Max: {formatCurrency(p.maxPrice)}</span>
                </div>
                {selectedPrice < p.recommendedPrice && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
                        ⚠️ Your price is {formatCurrency(p.recommendedPrice - selectedPrice)} below the recommended price. You may be undervaluing your craft.
                    </div>
                )}
                {selectedPrice > p.maxPrice * 0.9 && (
                    <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700">
                        ✅ Premium pricing! Position this as a collector's item and highlight the craft heritage in your story.
                    </div>
                )}
            </div>

            {/* Competitor ranges */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <h3 className="font-semibold text-[--text-primary] mb-4">Competitor Price Ranges by Marketplace</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={p.competitorRanges} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,98,45,0.08)" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: '#6B4423' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                        <YAxis type="category" dataKey="platform" tick={{ fontSize: 12, fill: '#6B4423' }} axisLine={false} tickLine={false} width={60} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v)]} contentStyle={{ borderRadius: 12, border: '1px solid rgba(196,98,45,0.2)', background: 'rgba(255,248,240,0.95)' }} />
                        <Bar dataKey="min" fill="rgba(196,98,45,0.3)" radius={4} name="Min" />
                        <Bar dataKey="max" fill="#C4622D" radius={4} name="Max" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Seasonality + Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-3">📅 Seasonality Insight</h3>
                    <p className="text-sm text-[--text-secondary] leading-relaxed">{p.seasonality}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-3">💡 AI Pricing Tips</h3>
                    <ul className="space-y-2">
                        {p.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[--text-secondary]">
                                <span className="text-[--saffron] flex-shrink-0 mt-0.5">•</span> {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
