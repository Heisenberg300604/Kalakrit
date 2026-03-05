import { useState } from 'react';
import { mockMarketplaces, mockProducts } from '../../services/mockData';
import type { Marketplace } from '../../types';

export default function MarketplaceExport() {
    const [marketplaces, setMarketplaces] = useState<Marketplace[]>(mockMarketplaces);
    const [published, setPublished] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(new Set(['1', '2', '4']));

    function toggleMarket(id: string) {
        setMarketplaces(m => m.map(mp => mp.id === id ? { ...mp, enabled: !mp.enabled } : mp));
    }

    function toggleProduct(id: string) {
        setSelectedProducts(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function handlePublishAll() {
        setPublishing(true);
        setTimeout(() => {
            setPublishing(false);
            setPublished(true);
        }, 2500);
    }

    const enabledCount = marketplaces.filter(m => m.enabled).length;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Marketplace Export</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Publish your listings across multiple marketplaces with one click</p>
            </div>

            {published ? (
                <div className="bg-white rounded-2xl p-10 border border-[--border-warm] text-center">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h2 className="font-display text-2xl font-bold text-[--text-primary] mb-2">Published Successfully!</h2>
                    <p className="text-[--text-secondary] mb-6">{selectedProducts.size} products are now live on {enabledCount} marketplaces</p>
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                        {marketplaces.filter(m => m.enabled).map(m => (
                            <div key={m.id} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm font-medium">
                                <span>{m.logo}</span> {m.name} <span className="text-green-500">✓</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => { setPublished(false); }} className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                        Manage Listings
                    </button>
                </div>
            ) : (
                <>
                    {/* Marketplace cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {marketplaces.map(mp => (
                            <div key={mp.id} className={`bg-white rounded-2xl p-5 border transition-all ${mp.enabled ? 'border-[--terracotta] shadow-md' : 'border-[--border-warm]'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${mp.color}18` }}>
                                        {mp.logo}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-[--text-primary]">{mp.name}</div>
                                        <div className="text-xs text-[--text-secondary]">
                                            {mp.commission === 0 ? '0% commission' : `${mp.commission}% commission`}
                                            {mp.listingsCount > 0 && ` • ${mp.listingsCount} active listings`}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleMarket(mp.id)}
                                        className={`relative w-12 h-6 rounded-full transition-all ${mp.enabled ? 'bg-[--terracotta]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${mp.enabled ? 'left-6' : 'left-0.5'}`}></span>
                                    </button>
                                </div>
                                {mp.enabled && (
                                    <div className="mt-3 pt-3 border-t border-[--border-warm] flex items-center gap-3">
                                        <span className="text-xs text-green-600 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>Connected</span>
                                        <span className="text-xs text-[--text-secondary]">{mp.listingsCount} listings synced</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Product selection */}
                    <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <h3 className="font-semibold text-[--text-primary] mb-4">Select Products to Export ({selectedProducts.size} selected)</h3>
                        <div className="space-y-3">
                            {mockProducts.map(product => (
                                <div key={product.id} onClick={() => toggleProduct(product.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedProducts.has(product.id) ? 'border-[--terracotta] bg-orange-50' : 'border-[--border-warm] hover:border-[--terracotta]/40'}`}>
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedProducts.has(product.id) ? 'border-[--terracotta] bg-[--terracotta]' : 'border-[--border-warm]'}`}>
                                        {selectedProducts.has(product.id) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-[--text-primary] truncate">{product.title}</div>
                                        <div className="text-xs text-[--text-secondary]">₹{product.price.toLocaleString('en-IN')} • {product.category}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${product.status === 'published' ? 'badge-green' : 'badge-saffron'}`}>{product.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Publish button */}
                    <div className="bg-white rounded-2xl p-6 border border-[--border-warm] text-center">
                        <div className="mb-3 text-sm text-[--text-secondary]">
                            Publishing <strong>{selectedProducts.size} products</strong> to <strong>{enabledCount} marketplaces</strong>
                        </div>
                        <button
                            onClick={handlePublishAll}
                            disabled={publishing || enabledCount === 0 || selectedProducts.size === 0}
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}
                        >
                            {publishing ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Publishing to all marketplaces...
                                </>
                            ) : (
                                <>🌐 Publish Everywhere</>
                            )}
                        </button>
                        {publishing && (
                            <div className="mt-4 grid grid-cols-4 gap-2">
                                {marketplaces.filter(m => m.enabled).map((m, i) => (
                                    <div key={m.id} className="text-center">
                                        <div className="text-xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{m.logo}</div>
                                        <div className="text-xs text-[--text-secondary] mt-1">{m.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
