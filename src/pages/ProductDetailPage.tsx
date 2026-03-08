import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, ShoppingBag, Tag, Layers, Sparkles, IndianRupee,
    Eye, MapPin, User, BookOpen, Landmark, Hammer, Gem, MessageCircle,
    Loader2, AlertCircle, CheckCircle2
} from 'lucide-react';
import supabase from '../utils/supabase';

interface ProductDetail {
    id: string;
    title: string;
    description: string;
    category: string;
    suggested_price: number;
    images: string[];
    tags: string[];
    materials: string[];
    highlights: string[];
    views_count: number;
    created_at: string;
    story_title: string | null;
    craft_heritage: string | null;
    how_its_made: string | null;
    why_unique: string | null;
    artisan_narrative: string | null;
    profiles?: { full_name: string; location: string; craft: string } | null;
}

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) fetchProduct(id);
    }, [id]);

    async function fetchProduct(productId: string) {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (error || !data) {
            setError('Product not found');
            setLoading(false);
            return;
        }

        // Fetch profile separately (products.user_id → profiles.id via auth.users)
        let profile = null;
        if (data.user_id) {
            const { data: profileData } = await supabase
                .from('profiles')
                .select('full_name, location, craft')
                .eq('id', data.user_id)
                .single();
            profile = profileData;
        }

        setProduct({ ...data, profiles: profile } as any);
        setLoading(false);
    }

    const hasStory = product?.story_title || product?.craft_heritage;
    const profile = product?.profiles as any;

    if (loading) {
        return (
            <div className="min-h-screen bg-[--warm-white] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-[--terracotta]" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[--warm-white] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-red-300 mb-4" />
                    <h2 className="font-semibold text-xl text-[--text-primary] mb-2">Product Not Found</h2>
                    <Link to="/marketplace" className="text-[--terracotta] font-medium text-sm hover:underline">← Back to Marketplace</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[--warm-white]">
            {/* Navbar */}
            <nav className="bg-white border-b border-[--border-warm] sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        <Link to="/marketplace" className="flex items-center gap-2 text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">
                            <ArrowLeft size={16} /> Back to Marketplace
                        </Link>
                        <Link to="/" className="flex items-center gap-2">
                            <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
                                <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                                <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                                <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-display text-base font-bold text-[--terracotta]">KalaKrit</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left column — Image + Quick info */}
                    <div className="lg:col-span-2 space-y-5">
                        {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full rounded-2xl object-cover aspect-square border border-[--border-warm]" />
                        ) : (
                            <div className="w-full rounded-2xl aspect-square bg-gradient-to-br from-[--beige] to-[--warm-white] flex items-center justify-center border border-[--border-warm]">
                                <ShoppingBag size={64} className="text-[--terracotta]/20" />
                            </div>
                        )}

                        {/* Artisan card */}
                        {profile && (
                            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        {profile.full_name?.charAt(0) || 'A'}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[--text-primary]">{profile.full_name || 'Artisan'}</div>
                                        <div className="flex items-center gap-1 text-xs text-[--text-secondary]">
                                            <MapPin size={10} /> {profile.location || 'India'}
                                        </div>
                                    </div>
                                </div>
                                {profile.craft && (
                                    <div className="flex items-center gap-1.5 text-xs text-[--text-secondary]">
                                        <User size={11} /> {profile.craft}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right column — Product details */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Title + Price */}
                        <div>
                            {product.category && (
                                <span className="text-xs px-2.5 py-1 rounded-full badge-saffron mb-3 inline-block">{product.category}</span>
                            )}
                            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary] mt-2">{product.title}</h1>
                            <div className="flex items-center gap-4 mt-3">
                                <span className="flex items-center gap-1 font-bold text-2xl text-[--terracotta]">
                                    <IndianRupee size={20} />{product.suggested_price?.toLocaleString('en-IN') || '0'}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-[--text-secondary]">
                                    <Eye size={12} /> {product.views_count || 0} views
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                            <h3 className="font-semibold text-[--text-primary] mb-3 flex items-center gap-2">
                                <BookOpen size={16} className="text-[--terracotta]" /> Description
                            </h3>
                            <p className="text-sm text-[--text-secondary] leading-relaxed whitespace-pre-line">{product.description}</p>
                        </div>

                        {/* Materials + Tags */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.materials?.length > 0 && (
                                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                                    <h3 className="font-semibold text-[--text-primary] mb-3 flex items-center gap-2 text-sm">
                                        <Layers size={14} className="text-[--terracotta]" /> Materials
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.materials.map(m => (
                                            <span key={m} className="px-3 py-1 rounded-full text-xs badge-saffron">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {product.tags?.length > 0 && (
                                <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                                    <h3 className="font-semibold text-[--text-primary] mb-3 flex items-center gap-2 text-sm">
                                        <Tag size={14} className="text-[--terracotta]" /> Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-xs badge-indigo">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Highlights */}
                        {product.highlights?.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                                <h3 className="font-semibold text-[--text-primary] mb-3 flex items-center gap-2">
                                    <Sparkles size={16} className="text-[--terracotta]" /> Product Highlights
                                </h3>
                                <ul className="space-y-2">
                                    {product.highlights.map(h => (
                                        <li key={h} className="flex items-start gap-2 text-sm text-[--text-secondary]">
                                            <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* ── AI Craft Story ── */}
                        {hasStory && (
                            <div className="rounded-2xl overflow-hidden border border-[--border-warm]">
                                <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.08), rgba(244,160,38,0.05))' }}>
                                    <h2 className="font-display text-xl font-bold text-[--text-primary] flex items-center gap-2">
                                        <BookOpen size={20} className="text-[--terracotta]" />
                                        {product.story_title || 'The Craft Story'}
                                    </h2>
                                </div>
                                <div className="bg-white p-6 space-y-5">
                                    {product.craft_heritage && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-[--text-primary] mb-1.5 flex items-center gap-2">
                                                <Landmark size={14} className="text-[--terracotta]" /> Craft Heritage
                                            </h4>
                                            <p className="text-sm text-[--text-secondary] leading-relaxed">{product.craft_heritage}</p>
                                        </div>
                                    )}
                                    {product.how_its_made && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-[--text-primary] mb-1.5 flex items-center gap-2">
                                                <Hammer size={14} className="text-[--terracotta]" /> How It's Made
                                            </h4>
                                            <p className="text-sm text-[--text-secondary] leading-relaxed">{product.how_its_made}</p>
                                        </div>
                                    )}
                                    {product.why_unique && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-[--text-primary] mb-1.5 flex items-center gap-2">
                                                <Gem size={14} className="text-[--terracotta]" /> What Makes It Special
                                            </h4>
                                            <p className="text-sm text-[--text-secondary] leading-relaxed">{product.why_unique}</p>
                                        </div>
                                    )}
                                    {product.artisan_narrative && (
                                        <div className="bg-[--warm-white] rounded-xl p-4 border-l-4 border-[--terracotta]">
                                            <h4 className="text-sm font-semibold text-[--text-primary] mb-1.5 flex items-center gap-2">
                                                <MessageCircle size={14} className="text-[--terracotta]" /> In the Artisan's Words
                                            </h4>
                                            <p className="text-sm text-[--text-secondary] leading-relaxed italic">"{product.artisan_narrative}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
