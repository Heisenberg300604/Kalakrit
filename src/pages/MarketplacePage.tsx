import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag, Eye, ArrowRight, Tag, Loader2 } from 'lucide-react';
import supabase from '../utils/supabase';
import { useAuth } from '../hooks/AuthContext';
import { formatCurrency } from '../lib/utils';

interface ProductCard {
    id: string;
    title: string;
    description: string;
    category: string;
    suggested_price: number;
    images: string[];
    tags: string[];
    materials: string[];
    views_count: number;
    created_at: string;
    profiles?: { full_name: string; location: string } | null;
}

const CATEGORIES = ['All', 'Textiles', 'Pottery', 'Folk Art', 'Metal Craft', 'Jewelry', 'Woodwork', 'Bamboo & Cane', 'Other'];

export default function MarketplacePage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('id, title, description, category, suggested_price, images, tags, materials, views_count, created_at, profiles(full_name, location)')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts((data as any) || []);
        }
        setLoading(false);
    }

    const filtered = products.filter(p => {
        const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category?.toLowerCase().includes(category.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[--warm-white]">
            {/* Navbar */}
            <nav className="bg-white border-b border-[--border-warm] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2.5">
                            <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
                                <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                                <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                                <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-display text-lg font-bold text-[--terracotta]">KalaKrit</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link to="/dashboard" className="text-sm px-4 py-2 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-[--text-secondary] hover:text-[--terracotta] font-medium transition-colors">Log in</Link>
                                    <Link to="/signup" className="text-sm px-4 py-2 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        Sell Your Craft
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <div className="gradient-warm py-12 px-4 text-center">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[--text-primary] mb-3">
                    Discover Authentic Indian Crafts
                </h1>
                <p className="text-[--text-secondary] text-lg max-w-xl mx-auto mb-8">
                    Handmade with love by artisans across India. Every purchase supports a livelihood and preserves heritage.
                </p>

                {/* Search */}
                <div className="max-w-lg mx-auto relative">
                    <Search size={18} className="absolute left-4 top-3.5 text-[--text-secondary]/50" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search crafts, artisans, materials..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[--border-warm] bg-white text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 shadow-sm transition-all"
                    />
                </div>
            </div>

            {/* Category filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    <Filter size={16} className="text-[--text-secondary] flex-shrink-0" />
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${category === cat
                                    ? 'text-white shadow-sm'
                                    : 'text-[--text-secondary] border border-[--border-warm] hover:border-[--terracotta]/50 hover:text-[--terracotta]'
                                }`}
                            style={category === cat ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-20">
                        <Loader2 size={32} className="animate-spin text-[--terracotta] mx-auto mb-3" />
                        <p className="text-sm text-[--text-secondary]">Loading crafts...</p>
                    </div>
                )}

                {/* Products grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map(product => (
                            <Link
                                key={product.id}
                                to={`/marketplace/${product.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-[--border-warm] card-hover block"
                            >
                                {product.images?.[0] ? (
                                    <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-[--beige] to-[--warm-white] flex items-center justify-center">
                                        <ShoppingBag size={40} className="text-[--terracotta]/30" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        {product.category && (
                                            <span className="text-xs px-2 py-0.5 rounded-full badge-saffron">{product.category}</span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-[--text-primary] text-sm line-clamp-2 leading-snug mb-2 group-hover:text-[--terracotta] transition-colors">{product.title}</h3>
                                    <p className="text-xs text-[--text-secondary] line-clamp-2 mb-3">{product.description}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-[--terracotta] text-lg">{formatCurrency(product.suggested_price || 0)}</span>
                                        <div className="flex items-center gap-1 text-xs text-[--text-secondary]">
                                            <Eye size={12} />
                                            {product.views_count || 0}
                                        </div>
                                    </div>

                                    {product.profiles && (
                                        <div className="mt-3 pt-3 border-t border-[--border-warm] flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                                {(product.profiles as any)?.full_name?.charAt(0) || 'A'}
                                            </div>
                                            <span className="text-xs text-[--text-secondary] truncate">
                                                {(product.profiles as any)?.full_name || 'Artisan'} · {(product.profiles as any)?.location || 'India'}
                                            </span>
                                        </div>
                                    )}

                                    {product.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {product.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[--beige] text-[--text-secondary]">
                                                    <Tag size={8} />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-20">
                        <ShoppingBag size={48} className="mx-auto text-[--terracotta]/20 mb-4" />
                        <h3 className="font-semibold text-lg text-[--text-primary] mb-2">No crafts found</h3>
                        <p className="text-[--text-secondary] text-sm mb-4">
                            {search ? `No results for "${search}"` : 'No products have been published yet.'}
                        </p>
                        <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            Be the first artisan <ArrowRight size={14} />
                        </Link>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-[--border-warm] py-8 px-4 mt-12">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-[--text-secondary]">© 2026 KalaKrit — Empowering India's Artisans</span>
                    <div className="flex gap-4">
                        <Link to="/" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">Home</Link>
                        <Link to="/signup" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">Sell Your Craft</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
