import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Filter, ShoppingBag, Eye, ArrowRight, Tag,
    SlidersHorizontal, Grid3X3, LayoutList, Sparkles, MapPin,
    TrendingUp, X, ChevronDown
} from 'lucide-react';
import supabase from '../utils/supabase';
import { useAuth } from '../hooks/AuthContext';
import { formatCurrency } from '../lib/utils';

interface ProductCard {
    id: string;
    user_id: string;
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

const CATEGORIES = [
    { label: 'All', emoji: '✨' },
    { label: 'Textiles', emoji: '🧵' },
    { label: 'Pottery', emoji: '🏺' },
    { label: 'Folk Art', emoji: '🎨' },
    { label: 'Metal Craft', emoji: '⚒️' },
    { label: 'Jewelry', emoji: '💎' },
    { label: 'Woodwork', emoji: '🪵' },
    { label: 'Bamboo & Cane', emoji: '🎋' },
    { label: 'Other', emoji: '🛍️' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Viewed' },
];

const TRUST_BADGES = [
    { icon: '🤝', text: 'Direct from Artisan' },
    { icon: '🌿', text: 'Ethically Made' },
    { icon: '🇮🇳', text: 'Indian Heritage' },
    { icon: '✅', text: 'Quality Verified' },
    { icon: '🚚', text: 'Pan-India Shipping' },
];

function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[--border-warm]">
            <div className="w-full h-52 skeleton" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-20 rounded-full skeleton" />
                <div className="h-4 w-full rounded skeleton" />
                <div className="h-3 w-3/4 rounded skeleton" />
                <div className="h-3 w-1/2 rounded skeleton" />
                <div className="flex justify-between items-center pt-1">
                    <div className="h-5 w-24 rounded skeleton" />
                    <div className="h-4 w-12 rounded skeleton" />
                </div>
            </div>
        </div>
    );
}

export default function MarketplacePage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    async function fetchProducts() {
        setLoading(true);

        // Step 1: fetch published products (no join — products.user_id → auth.users, not profiles)
        const { data: productData, error } = await supabase
            .from('products')
            .select('id, user_id, title, description, category, suggested_price, images, tags, materials, views_count, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
            return;
        }

        const products = (productData || []) as ProductCard[];

        // Step 2: fetch profiles for all unique user_ids
        const userIds = [...new Set(products.map(p => p.user_id).filter(Boolean))];
        if (userIds.length > 0) {
            const { data: profileData } = await supabase
                .from('profiles')
                .select('id, full_name, location')
                .in('id', userIds);

            const profileMap = new Map((profileData || []).map((p: any) => [p.id, p]));
            const enriched = products.map(p => ({
                ...p,
                profiles: profileMap.get(p.user_id) || null,
            }));
            setProducts(enriched);
        } else {
            setProducts(products);
        }

        setLoading(false);
    }

    const filtered = useMemo(() => {
        let result = products.filter(p => {
            const matchesSearch = !debouncedSearch ||
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
            const matchesCategory = category === 'All' || p.category?.toLowerCase().includes(category.toLowerCase());
            return matchesSearch && matchesCategory;
        });

        switch (sort) {
            case 'price_asc': return [...result].sort((a, b) => (a.suggested_price || 0) - (b.suggested_price || 0));
            case 'price_desc': return [...result].sort((a, b) => (b.suggested_price || 0) - (a.suggested_price || 0));
            case 'popular': return [...result].sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
            default: return result;
        }
    }, [products, debouncedSearch, category, sort]);

    const activeSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label;

    return (
        <div className="min-h-screen" style={{ background: '#FFF8F0' }}>

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-[--border-warm] sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2.5">
                            <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                                <ellipse cx="18" cy="24" rx="10" ry="7" fill="#702828" opacity="0.15" />
                                <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#702828" />
                                <path d="M14 14 Q18 10 22 14" stroke="#DC143C" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-display text-xl font-bold" style={{ color: '#702828' }}>KalaKrit</span>
                        </Link>

                        {/* Center nav links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/marketplace" className="text-sm font-semibold border-b-2 pb-0.5" style={{ color: '#702828', borderColor: '#702828' }}>
                                Marketplace
                            </Link>
                            <Link to="/" className="text-sm text-[--text-secondary] hover:text-[--terracotta] font-medium transition-colors">
                                Home
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link to="/dashboard" className="text-sm px-5 py-2 rounded-full font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #702828, #DC143C)' }}>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-[--text-secondary] hover:text-[--terracotta] font-medium transition-colors">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="text-sm px-5 py-2 rounded-full font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #702828, #DC143C)' }}>
                                        Start Selling
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Hero Banner ────────────────────────────────────────── */}
            <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF0E8 0%, #F5EDD6 40%, #FFE8D0 100%)' }}>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #702828 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #DC143C 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(112,40,40,0.08)', color: '#702828', border: '1px solid rgba(112,40,40,0.2)' }}>
                            <Sparkles size={12} />
                            Authentic Handcrafted Goods
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: '#1A0A00' }}>
                            Discover India's <br />
                            <span style={{ color: '#702828' }}>Living Crafts</span>
                        </h1>
                        <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#8B4513' }}>
                            Every piece tells a story. Every purchase empowers an artisan.
                            Shop directly from skilled craftspeople across India.
                        </p>

                        {/* Search bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#8B4513', opacity: 0.5 }} />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search crafts, artisans, materials..."
                                className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm focus:outline-none transition-all shadow-md"
                                style={{
                                    background: 'white',
                                    border: '1.5px solid rgba(112,40,40,0.15)',
                                    color: '#1A0A00',
                                }}
                                onFocus={e => (e.target.style.borderColor = 'rgba(112,40,40,0.5)')}
                                onBlur={e => (e.target.style.borderColor = 'rgba(112,40,40,0.15)')}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                                    style={{ color: '#8B4513' }}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats row */}
                    {!loading && (
                        <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
                            {[
                                { value: products.length, label: 'Products Listed' },
                                { value: new Set(products.map(p => (p.profiles as any)?.full_name).filter(Boolean)).size, label: 'Artisans' },
                                { value: CATEGORIES.length - 1, label: 'Craft Categories' },
                            ].map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <div className="text-2xl font-bold font-display" style={{ color: '#702828' }}>{value}+</div>
                                    <div className="text-xs mt-0.5" style={{ color: '#8B4513' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Trust badge marquee ─────────────────────────────────── */}
            <div className="border-y overflow-hidden py-2.5" style={{ borderColor: 'rgba(112,40,40,0.12)', background: 'rgba(112,40,40,0.03)' }}>
                <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
                    {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
                        <span key={i} className="inline-flex items-center gap-2 text-xs font-medium px-1" style={{ color: '#8B4513' }}>
                            <span>{b.icon}</span>{b.text}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Main Content ───────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Category pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                    <Filter size={15} className="flex-shrink-0" style={{ color: '#8B4513' }} />
                    {CATEGORIES.map(({ label, emoji }) => {
                        const active = category === label;
                        return (
                            <button
                                key={label}
                                onClick={() => setCategory(label)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
                                style={active
                                    ? { background: 'linear-gradient(135deg, #702828, #DC143C)', color: 'white', boxShadow: '0 4px 12px rgba(112,40,40,0.3)' }
                                    : { background: 'white', color: '#8B4513', border: '1.5px solid rgba(112,40,40,0.15)' }
                                }
                            >
                                <span>{emoji}</span>
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Results bar */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div>
                        {!loading && (
                            <p className="text-sm" style={{ color: '#8B4513' }}>
                                <span className="font-semibold" style={{ color: '#1A0A00' }}>{filtered.length}</span> craft{filtered.length !== 1 ? 's' : ''} found
                                {debouncedSearch && <span> for "<span className="font-medium">{debouncedSearch}</span>"</span>}
                                {category !== 'All' && <span> in <span className="font-medium">{category}</span></span>}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Sort dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown(v => !v)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                                style={{ background: 'white', border: '1.5px solid rgba(112,40,40,0.15)', color: '#8B4513' }}
                            >
                                <SlidersHorizontal size={14} />
                                <span className="hidden sm:inline">{activeSortLabel}</span>
                                <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showSortDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-20 overflow-hidden py-1" style={{ borderColor: 'rgba(112,40,40,0.15)' }}>
                                    {SORT_OPTIONS.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSort(opt.value); setShowSortDropdown(false); }}
                                            className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[--beige]"
                                            style={{ color: sort === opt.value ? '#702828' : '#1A0A00', fontWeight: sort === opt.value ? 600 : 400 }}
                                        >
                                            {sort === opt.value && <span className="mr-2">✓</span>}{opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* View toggle */}
                        <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(112,40,40,0.15)' }}>
                            <button
                                onClick={() => setViewMode('grid')}
                                className="p-2 transition-colors"
                                style={{ background: viewMode === 'grid' ? 'rgba(112,40,40,0.08)' : 'white', color: viewMode === 'grid' ? '#702828' : '#8B4513' }}
                            >
                                <Grid3X3 size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className="p-2 transition-colors"
                                style={{ background: viewMode === 'list' ? 'rgba(112,40,40,0.08)' : 'white', color: viewMode === 'list' ? '#702828' : '#8B4513' }}
                            >
                                <LayoutList size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Loading skeletons ─── */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* ── Products: Grid view ─── */}
                {!loading && filtered.length > 0 && viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map((product, idx) => (
                            <Link
                                key={product.id}
                                to={`/marketplace/${product.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border block animate-fade-in-up"
                                style={{
                                    borderColor: 'rgba(112,40,40,0.1)',
                                    boxShadow: '0 2px 8px rgba(112,40,40,0.06)',
                                    animationDelay: `${Math.min(idx * 0.05, 0.4)}s`,
                                    animationFillMode: 'both',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(112,40,40,0.15)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(112,40,40,0.06)';
                                }}
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden h-52">
                                    {product.images?.[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF0E8, #F5EDD6)' }}>
                                            <ShoppingBag size={44} style={{ color: 'rgba(112,40,40,0.2)' }} />
                                        </div>
                                    )}
                                    {/* Category badge overlay */}
                                    {product.category && (
                                        <div className="absolute top-3 left-3">
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.85)', color: '#702828' }}>
                                                {CATEGORIES.find(c => c.label.toLowerCase() === product.category?.toLowerCase())?.emoji} {product.category}
                                            </span>
                                        </div>
                                    )}
                                    {/* View count overlay */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}>
                                        <Eye size={10} />
                                        {product.views_count || 0}
                                    </div>
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4" style={{ background: 'linear-gradient(to top, rgba(112,40,40,0.6) 0%, transparent 60%)' }}>
                                        <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                                            View Details <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm leading-snug mb-1.5 line-clamp-2 transition-colors group-hover:text-[--terracotta]" style={{ color: '#1A0A00' }}>
                                        {product.title}
                                    </h3>
                                    <p className="text-xs line-clamp-2 mb-3 leading-relaxed" style={{ color: '#8B4513', opacity: 0.8 }}>
                                        {product.description}
                                    </p>

                                    {/* Price row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-lg font-bold font-display" style={{ color: '#702828' }}>
                                            {formatCurrency(product.suggested_price || 0)}
                                        </span>
                                        {product.materials?.length > 0 && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(112,40,40,0.06)', color: '#8B4513' }}>
                                                {product.materials[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Artisan info */}
                                    {product.profiles && (
                                        <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(112,40,40,0.08)' }}>
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] text-white font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #702828, #DC143C)' }}>
                                                {(product.profiles as any)?.full_name?.charAt(0)?.toUpperCase() || 'A'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-medium truncate" style={{ color: '#1A0A00' }}>
                                                    {(product.profiles as any)?.full_name || 'Artisan'}
                                                </div>
                                                {(product.profiles as any)?.location && (
                                                    <div className="flex items-center gap-0.5 text-[10px]" style={{ color: '#8B4513', opacity: 0.7 }}>
                                                        <MapPin size={8} />
                                                        {(product.profiles as any).location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {product.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {product.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(112,40,40,0.05)', color: '#8B4513', border: '1px solid rgba(112,40,40,0.1)' }}>
                                                    <Tag size={7} />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* ── Products: List view ─── */}
                {!loading && filtered.length > 0 && viewMode === 'list' && (
                    <div className="flex flex-col gap-4">
                        {filtered.map((product, idx) => (
                            <Link
                                key={product.id}
                                to={`/marketplace/${product.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border flex animate-fade-in-up"
                                style={{
                                    borderColor: 'rgba(112,40,40,0.1)',
                                    boxShadow: '0 2px 8px rgba(112,40,40,0.06)',
                                    animationDelay: `${Math.min(idx * 0.04, 0.3)}s`,
                                    animationFillMode: 'both',
                                    transition: 'box-shadow 0.2s ease',
                                }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(112,40,40,0.15)')}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(112,40,40,0.06)')}
                            >
                                <div className="w-36 h-36 sm:w-48 sm:h-auto flex-shrink-0 overflow-hidden">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF0E8, #F5EDD6)' }}>
                                            <ShoppingBag size={36} style={{ color: 'rgba(112,40,40,0.2)' }} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {product.category && (
                                                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(112,40,40,0.08)', color: '#702828' }}>
                                                        {product.category}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: '#8B4513', opacity: 0.7 }}>
                                                <Eye size={11} />
                                                {product.views_count || 0} views
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1.5 group-hover:text-[--terracotta] transition-colors" style={{ color: '#1A0A00' }}>
                                            {product.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed" style={{ color: '#8B4513', opacity: 0.8 }}>
                                            {product.description}
                                        </p>
                                        {product.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {product.tags.slice(0, 4).map(tag => (
                                                    <span key={tag} className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(112,40,40,0.05)', color: '#8B4513', border: '1px solid rgba(112,40,40,0.1)' }}>
                                                        <Tag size={7} />{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t flex-wrap gap-2" style={{ borderColor: 'rgba(112,40,40,0.08)' }}>
                                        <div className="flex items-center gap-2">
                                            {product.profiles && (
                                                <>
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold" style={{ background: 'linear-gradient(135deg, #702828, #DC143C)' }}>
                                                        {(product.profiles as any)?.full_name?.charAt(0)?.toUpperCase() || 'A'}
                                                    </div>
                                                    <span className="text-xs" style={{ color: '#8B4513' }}>
                                                        {(product.profiles as any)?.full_name || 'Artisan'}
                                                        {(product.profiles as any)?.location && <span style={{ opacity: 0.6 }}> · {(product.profiles as any).location}</span>}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-bold font-display" style={{ color: '#702828' }}>
                                                {formatCurrency(product.suggested_price || 0)}
                                            </span>
                                            <span className="hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(112,40,40,0.08)', color: '#702828' }}>
                                                View <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* ── Empty state ─── */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(112,40,40,0.06)' }}>
                            <ShoppingBag size={36} style={{ color: 'rgba(112,40,40,0.3)' }} />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#1A0A00' }}>
                            {debouncedSearch ? 'No results found' : 'No crafts yet'}
                        </h3>
                        <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: '#8B4513' }}>
                            {debouncedSearch
                                ? `We couldn't find anything for "${debouncedSearch}". Try a different search or browse all categories.`
                                : 'Be the first artisan to list your craft on KalaKrit.'}
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            {debouncedSearch && (
                                <button onClick={() => { setSearch(''); setCategory('All'); }} className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors" style={{ color: '#702828', borderColor: 'rgba(112,40,40,0.3)', background: 'white' }}>
                                    Clear search
                                </button>
                            )}
                            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #702828, #DC143C)' }}>
                                Start Selling <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                )}

                {/* ── Load more hint (if many products) ─── */}
                {!loading && filtered.length > 12 && (
                    <div className="text-center mt-10">
                        <div className="flex items-center gap-2 justify-center text-sm" style={{ color: '#8B4513' }}>
                            <TrendingUp size={14} />
                            Showing all {filtered.length} results
                        </div>
                    </div>
                )}
            </div>

            {/* ── CTA Banner ──────────────────────────────────────────── */}
            <div className="mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto my-12 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #702828 0%, #4A1010 60%, #2A0808 100%)' }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 10px, rgba(255,255,255,0.05) 11px, transparent 12px)' }} />
                <div className="relative px-8 py-12 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                        Are you an artisan?
                    </h2>
                    <p className="text-white/70 text-sm sm:text-base mb-6 max-w-md mx-auto">
                        Use your voice to list products, get AI-powered descriptions, and reach customers across India.
                    </p>
                    <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #F4A026, #DC143C)', color: 'white', boxShadow: '0 4px 20px rgba(244,160,38,0.4)' }}>
                        Start Selling Free <ArrowRight size={15} />
                    </Link>
                </div>
            </div>

            {/* ── Footer ──────────────────────────────────────────────── */}
            <footer className="border-t py-8 px-4 mt-4" style={{ borderColor: 'rgba(112,40,40,0.12)', background: 'white' }}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
                            <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#702828" />
                        </svg>
                        <span className="text-sm font-semibold" style={{ color: '#702828' }}>KalaKrit</span>
                        <span className="text-sm" style={{ color: '#8B4513', opacity: 0.6 }}>— Empowering India's Artisans</span>
                    </div>
                    <div className="flex gap-6">
                        <Link to="/" className="text-sm transition-colors hover:text-[--terracotta]" style={{ color: '#8B4513' }}>Home</Link>
                        <Link to="/marketplace" className="text-sm transition-colors hover:text-[--terracotta]" style={{ color: '#8B4513' }}>Marketplace</Link>
                        <Link to="/signup" className="text-sm transition-colors hover:text-[--terracotta]" style={{ color: '#8B4513' }}>Sell Your Craft</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
