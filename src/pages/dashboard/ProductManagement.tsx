import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Edit2, Trash2, Package, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import supabase from '../../utils/supabase';

export default function ProductManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('id, title, description, category, suggested_price, images, tags, views_count, orders_count, status, created_at')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data);
        }
    }

    const filtered = products.filter(p => filter === 'all' || p.status === filter);

    function handleDelete(id: string) {
        setProducts(products.filter(p => p.id !== id));
        setDeleteId(null);
    }

    const statusColors: Record<string, string> = {
        published: 'badge-green',
        draft: 'badge-saffron',
        archived: 'badge-terracotta',
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">My Products</h1>
                    <p className="text-[--text-secondary] text-sm mt-1">{products.length} products in your catalog</p>
                </div>
                <Link to="/dashboard/voice" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                    + Add Product
                </Link>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 p-1 bg-[--warm-white] rounded-xl w-fit border border-[--border-warm]">
                {(['all', 'published', 'draft'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f ? 'text-white shadow' : 'text-[--text-secondary] hover:text-[--terracotta]'}`}
                        style={filter === f ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}>
                        {f} {f === 'all' ? `(${products.length})` : `(${products.filter(p => p.status === f).length})`}
                    </button>
                ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[--border-warm] card-hover flex flex-col">
                        <div className="relative">
                            {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.title} className="w-full h-44 object-cover" />
                            ) : (
                                <div className="w-full h-44 bg-gradient-to-br from-[--beige] to-[--warm-white] flex items-center justify-center">
                                    <Package size={32} className="text-[--terracotta]/40" />
                                </div>
                            )}
                            <div className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                                <Sparkles size={10} /> {product.category || 'Uncategorized'}
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[product.status]}`}>{product.status}</span>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-semibold text-[--text-primary] text-sm line-clamp-2 leading-snug mb-1">{product.title}</h3>
                            <p className="text-xs text-[--text-secondary] line-clamp-2 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <span className="font-bold text-[--terracotta] text-base block">{formatCurrency(product.suggested_price || 0)}</span>
                                    <span className="text-[10px] text-[--text-secondary]">Suggested price</span>
                                </div>
                                <div className="flex flex-col items-end gap-1 text-xs text-[--text-secondary]">
                                    <span className="flex items-center gap-1">
                                        <Eye size={12} /> {product.views_count || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ShoppingBag size={12} /> {product.orders_count || 0} orders
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 py-2 rounded-xl text-xs font-semibold border border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] transition-all inline-flex items-center justify-center gap-1.5">
                                    <Edit2 size={12} /> Edit
                                </button>
                                <button
                                    onClick={() => setDeleteId(product.id)}
                                    className="flex-1 py-2 rounded-xl text-xs font-semibold border border-red-100 text-red-400 hover:border-red-300 hover:text-red-600 transition-all inline-flex items-center justify-center gap-1.5"
                                >
                                    <Trash2 size={12} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <Package size={48} className="mx-auto text-[--terracotta]/20 mb-4" />
                    <h3 className="font-semibold text-[--text-primary] text-lg">No products here</h3>
                    <p className="text-[--text-secondary] text-sm mt-1">Add your first product using the Voice Assistant</p>
                    <Link to="/dashboard/voice" className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                        Add with Voice
                    </Link>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="text-4xl text-center mb-3">⚠️</div>
                        <h3 className="font-semibold text-xl text-[--text-primary] text-center">Delete Product?</h3>
                        <p className="text-[--text-secondary] text-sm text-center mt-2 mb-6">This will permanently remove the product and its listings from all marketplaces.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-[--border-warm] text-[--text-secondary] font-semibold text-sm hover:bg-[--warm-white] transition-all">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
