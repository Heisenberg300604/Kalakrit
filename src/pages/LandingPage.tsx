import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Mic, Globe, BookOpen, TrendingUp, Package,
    BarChart2, ShieldCheck, Languages, Menu, X
} from 'lucide-react';
import { useLang } from '../hooks/useLanguage';
import { useAuth } from '../hooks/AuthContext';
import type { Language } from '../types';

const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
];

const features = [
    {
        icon: Mic,
        title: 'Voice-to-Listing',
        desc: 'Speak your product details in any Indian language. AI creates a full, marketplace-ready listing within seconds.',
    },
    {
        icon: BookOpen,
        title: 'AI Storytelling',
        desc: 'Every craft carries a story. AI weaves your heritage into compelling narratives that help buyers connect and convert.',
    },
    {
        icon: TrendingUp,
        title: 'Smart Pricing',
        desc: 'Data-driven pricing recommendations based on live demand, seasonality, and competitor analysis across platforms.',
    },
    {
        icon: Globe,
        title: 'Multi-Marketplace',
        desc: 'One click to publish your listing to Amazon, Etsy, Flipkart, and Meesho simultaneously.',
    },
    {
        icon: BarChart2,
        title: 'Market Insights',
        desc: 'Understand seasonal demand cycles, buyer demographics, and emerging trends relevant to your craft.',
    },
    {
        icon: Package,
        title: '360° Showcase',
        desc: 'Multi-angle interactive product viewer with an AR preview option to showcase every minute detail.',
    },
    {
        icon: ShieldCheck,
        title: 'AI Commerce Guide',
        desc: 'A built-in business mentor for pricing advice, product naming, marketing strategy, and craft storytelling.',
    },
    {
        icon: Languages,
        title: 'Regional Language',
        desc: 'Full UI support for Hindi, Tamil, Telugu, Bengali, and English — for artisans who think in their mother tongue.',
    },
];

const steps = [
    { num: '01', title: 'Kala (Craft)', desc: 'Speak your craft details in your mother tongue. AI creates a professional product listing with photos, descriptions, and tags.' },
    { num: '02', title: 'Kathan (Story)', desc: 'AI weaves your heritage into compelling narratives that connect with global buyers and preserve cultural stories.' },
    { num: '03', title: 'Karobaar (Business)', desc: 'Smart pricing, multi-marketplace publishing, and business insights help you grow your craft business globally.' },
];

const stats = [
    { value: '10,000+', label: 'Artisans Empowered' },
    { value: '₹2.4 Cr+', label: 'Revenue Generated' },
    { value: '46', label: 'Regional Languages' },
    { value: '4', label: 'Marketplace Partners' },
];

const problems = [
    {
        title: 'Language Barrier',
        desc: 'Most artisans speak regional languages and cannot write English product listings required by major marketplaces.',
    },
    {
        title: 'Middlemen Exploitation',
        desc: 'Artisans typically take home only 20–30% of the final selling price through layers of middlemen.',
    },
    {
        title: 'Zero Online Visibility',
        desc: 'Without digital skills or support, artisans cannot access the 500+ million online shoppers in India and abroad.',
    },
    {
        title: 'Undervalued Craft',
        desc: 'Handmade, heritage products are routinely priced below their true cultural and labour worth.',
    },
];

const impacts = [
    { title: '3× Higher Income', desc: 'Direct marketplace selling removes middlemen, tripling artisan take-home earnings on average.' },
    { title: 'Global Reach', desc: 'Reach buyers across 120+ countries through integrated international and domestic marketplace channels.' },
    { title: 'Cultural Preservation', desc: 'AI-powered storytelling ensures traditional craft histories are documented, shared, and celebrated globally.' },
    { title: 'Digital Independence', desc: 'No coding, no English, no tech skills required. The voice-first interface removes every digital barrier.' },
];

export default function LandingPage() {
    const { lang, setLang, t } = useLang();
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Sticky horizontal scroll for How It Works section
    useEffect(() => {
        const section = document.getElementById('how-it-works');
        const container = section?.querySelector('.sticky-scroll-content') as HTMLElement;

        if (!section || !container) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));

            if (scrollProgress > 0 && scrollProgress < 1) {
                // Calculate horizontal scroll based on vertical scroll progress
                const maxScroll = container.scrollWidth - container.clientWidth;
                container.scrollLeft = scrollProgress * maxScroll;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Audio player interaction
    useEffect(() => {
        const playBtn = document.querySelector('.audio-play-btn') as HTMLElement;
        const player = document.querySelector('.bg-white\\/50') as HTMLElement;

        if (!playBtn || !player) return;

        const handlePlay = () => {
            const isPlaying = player.classList.contains('audio-playing');
            const playIcon = playBtn.querySelector('.play-icon') as HTMLElement;
            const pauseIcon = playBtn.querySelector('.pause-icon') as HTMLElement;

            if (isPlaying) {
                player.classList.remove('audio-playing');
                playIcon?.classList.remove('hidden');
                pauseIcon?.classList.add('hidden');
            } else {
                player.classList.add('audio-playing');
                playIcon?.classList.add('hidden');
                pauseIcon?.classList.remove('hidden');
            }
        };

        playBtn.addEventListener('click', handlePlay);
        return () => playBtn.removeEventListener('click', handlePlay);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2.5">
                            <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                                <ellipse cx="18" cy="24" rx="10" ry="7" fill="#702828" opacity="0.15" />
                                <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#702828" />
                                <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-display text-xl font-bold text-[--terracotta]">KalaKrit</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/marketplace" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors font-medium">{t('Marketplace')}</Link>
                            <a href="#features" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">{t('Features')}</a>
                            <a href="#how-it-works" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">{t('How it Works')}</a>
                            <a href="#impact" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">{t('Impact')}</a>
                            <div className="relative">
                                <button
                                    onClick={() => setShowLangMenu(!showLangMenu)}
                                    className="text-sm px-3 py-1.5 rounded-full border border-[--border-warm] text-[--text-secondary] hover:bg-[--beige] transition-colors flex items-center gap-1.5"
                                >
                                    <Languages size={13} />
                                    {languages.find(l => l.code === lang)?.native}
                                </button>
                                {showLangMenu && (
                                    <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl border border-[--border-warm] z-50 overflow-hidden">
                                        <div className="px-3 py-2 text-[10px] uppercase tracking-wide text-[--text-secondary]/70 border-b border-[--border-warm]">
                                            Preferred Language
                                        </div>
                                        {languages.map(l => (
                                            <button
                                                key={l.code}
                                                onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[--beige] transition-colors ${
                                                    lang === l.code ? 'text-[--terracotta] font-semibold' : 'text-[--text-secondary]'
                                                }`}
                                            >
                                                <span>{l.native}</span>
                                                {lang === l.code && <span className="text-[--terracotta] text-xs">●</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link to="/dashboard" className="text-sm px-4 py-2 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                    {t('Go to Dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:block text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors font-medium">{t('Log in')}</Link>
                                    <Link to="/signup" className="text-sm px-4 py-2 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        {t('Get Started')}
                                    </Link>
                                </>
                            )}
                            <button className="md:hidden p-1 text-[--text-secondary]" onClick={() => setMobileMenuOpen(v => !v)}>
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden glass border-t border-[--border-warm] px-4 py-4 space-y-3">
                        {['Features', 'How it Works', 'Impact'].map(item => (
                            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="block text-sm font-medium text-[--text-secondary] hover:text-[--terracotta] py-1" onClick={() => setMobileMenuOpen(false)}>
                                {t(item)}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section - Pure Typography */}
            <section className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F5F0' }}>
                <div className="max-w-7xl mx-auto text-center">
                    {/* Premium Typography Hierarchy */}
                    <h1 className="font-display font-normal text-[--text-primary]" style={{ color: '#3A2618', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1.1' }}>
                        From local streets to global feeds.<br />
                        <span className="italic font-light" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', lineHeight: '0.9' }}>
                            Heritage unmuted.
                        </span>
                    </h1>
                </div>
            </section>

            {/* Moving Text Marquee */}
            <section className="py-6" style={{ backgroundColor: '#702828' }}>
                <div className="overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-white text-xl font-medium mx-8">KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR</span>
                        <span className="text-white text-xl font-medium mx-8">KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR • KALA • KATHAN • KAROBAAR</span>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 px-4" style={{ backgroundColor: '#702828', color: 'white' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-terracotta inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4">{t('The Problem')}</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Why Artisans Stay Invisible Online</h2>
                        <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
                            {t('Despite making world-class crafts, millions of Indian artisans are cut off from digital markets — not because of their talent, but due to structural barriers.')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {problems.map((p, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-white/20 hover:shadow-lg transition-all card-hover bg-white/5">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 text-white font-bold font-display text-lg border border-white/20">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="font-semibold text-lg text-white mb-2">{t(p.title)}</h3>
                                <p className="text-white/70 text-sm leading-relaxed">{t(p.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Clean Cards */}
            <section className="py-24 px-4" style={{ backgroundColor: '#F5F5DC' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Voice-to-Listing */}
                        <div className="p-8 border-2 border-[--terracotta] rounded-lg hover:bg-[--terracotta] hover:text-white transition-colors duration-200 group">
                            <div className="w-12 h-12 rounded-lg bg-[--terracotta] flex items-center justify-center mb-6 group-hover:bg-white">
                                <Mic size={24} className="text-white group-hover:text-[--terracotta]" />
                            </div>
                            <h3 className="font-semibold text-xl text-[--text-primary] mb-4 group-hover:text-white">Voice-to-Listing</h3>
                            <p className="text-[--text-secondary] leading-relaxed group-hover:text-white/90">
                                Speak in your mother tongue. AI creates professional marketplace listings instantly.
                            </p>
                        </div>

                        {/* Card 2: AI Commerce Guide */}
                        <div className="p-8 border-2 border-[--terracotta] rounded-lg hover:bg-[--terracotta] hover:text-white transition-colors duration-200 group">
                            <div className="w-12 h-12 rounded-lg bg-[--terracotta] flex items-center justify-center mb-6 group-hover:bg-white">
                                <BookOpen size={24} className="text-white group-hover:text-[--terracotta]" />
                            </div>
                            <h3 className="font-semibold text-xl text-[--text-primary] mb-4 group-hover:text-white">AI Commerce Guide</h3>
                            <p className="text-[--text-secondary] leading-relaxed group-hover:text-white/90">
                                Your personal business mentor for pricing, marketing, and growth strategies.
                            </p>
                        </div>

                        {/* Card 3: Global Export */}
                        <div className="p-8 border-2 border-[--terracotta] rounded-lg hover:bg-[--terracotta] hover:text-white transition-colors duration-200 group">
                            <div className="w-12 h-12 rounded-lg bg-[--terracotta] flex items-center justify-center mb-6 group-hover:bg-white">
                                <Globe size={24} className="text-white group-hover:text-[--terracotta]" />
                            </div>
                            <h3 className="font-semibold text-xl text-[--text-primary] mb-4 group-hover:text-white">Global Export</h3>
                            <p className="text-[--text-secondary] leading-relaxed group-hover:text-white/90">
                                One-click publishing to Amazon, Etsy, Flipkart, and international marketplaces.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artisan Spotlight */}
            <section className="py-24 px-4 gradient-warm relative overflow-hidden">
                {/* Parallax Background */}
                <div className="absolute inset-0 parallax-bg opacity-10">
                    <div className="w-full h-full bg-gradient-to-br from-[--beige] to-[--warm-white] flex items-center justify-center">
                        <span className="text-9xl opacity-20">🧵</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="badge-terracotta inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4">Artisan Spotlight</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary]">Meet the Masters</h2>
                        <p className="text-[--text-secondary] mt-4 max-w-xl mx-auto text-lg">Real artisans sharing their stories and showcasing their craft through our voice-first platform.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Artisan Profile Card */}
                        <div className="glass rounded-3xl p-8 card-hover border border-[--border-warm] relative">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[--beige] to-[--warm-white] flex items-center justify-center">
                                    <span className="text-2xl">👩‍🎨</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-xl text-[--text-primary] mb-1">Priya Sharma</h3>
                                    <p className="text-[--text-secondary] text-sm mb-2">Banarasi Silk Weaver, Varanasi</p>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 rounded-full bg-[--terracotta]/10 text-[--terracotta] text-xs font-medium">15+ Years Experience</span>
                                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">3× Income Growth</span>
                                    </div>
                                </div>
                            </div>

                            <blockquote className="text-[--text-secondary] italic mb-6 leading-relaxed">
                                "KalaKrit changed everything. I speak in Bhojpuri, and my sarees now reach customers in America and Europe. The AI understands my craft better than any middleman ever did."
                            </blockquote>

                            {/* Interactive Audio Player with Visualizer */}
                            <div className="bg-white/50 rounded-2xl p-4 border border-[--border-warm] relative overflow-hidden">
                                {/* Audio Visualizer Background */}
                                <div className="absolute inset-0 opacity-0 audio-playing">
                                    <div className="flex items-end justify-center h-full gap-1">
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="bg-[--terracotta]/30 rounded-full animate-audio-bar"
                                                style={{
                                                    width: '3px',
                                                    height: `${Math.random() * 40 + 10}px`,
                                                    animationDelay: `${i * 0.1}s`,
                                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-[--terracotta] flex items-center justify-center">
                                        <Mic size={16} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-[--text-primary]">Priya's Craft Story</div>
                                        <div className="text-xs text-[--text-secondary]">2:34 • Recorded in Bhojpuri</div>
                                    </div>
                                    <button className="audio-play-btn w-8 h-8 rounded-full bg-[--terracotta] flex items-center justify-center hover:bg-[--terracotta]/80 transition-colors">
                                        <span className="text-white text-sm play-icon">▶</span>
                                        <span className="text-white text-sm pause-icon hidden">⏸</span>
                                    </button>
                                </div>
                                <div className="w-full bg-white/30 rounded-full h-1.5 relative z-10">
                                    <div className="bg-[--terracotta] h-1.5 rounded-full w-1/3 transition-all duration-300 audio-progress"></div>
                                </div>
                            </div>
                        </div>

                        {/* Product Showcase */}
                        <div className="space-y-6">
                            <div className="glass rounded-2xl p-6 card-hover border border-[--border-warm]">
                                <div className="aspect-square bg-gradient-to-br from-[--beige] to-[--warm-white] rounded-xl mb-4 flex items-center justify-center">
                                    <span className="text-4xl">🧵</span>
                                </div>
                                <h4 className="font-semibold text-lg text-[--text-primary] mb-2">Handwoven Banarasi Silk Saree</h4>
                                <p className="text-[--text-secondary] text-sm mb-3">Traditional motifs with modern appeal, now available globally through 4 marketplaces.</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-xl font-bold text-[--terracotta]">₹12,500</span>
                                    <span className="text-xs text-green-600 font-medium">Sold 47 pieces this month</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass rounded-xl p-4 card-hover border border-[--border-warm] text-center">
                                    <div className="text-2xl font-bold text-[--terracotta] mb-1">47</div>
                                    <div className="text-xs text-[--text-secondary]">Monthly Sales</div>
                                </div>
                                <div className="glass rounded-xl p-4 card-hover border border-[--border-warm] text-center">
                                    <div className="text-2xl font-bold text-[--terracotta] mb-1">12</div>
                                    <div className="text-xs text-[--text-secondary]">Countries Reached</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-24 px-4 gradient-warm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 badge-saffron">Impact</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary]">
                            {t('Transforming Lives, Preserving Heritage')}
                        </h2>
                        <p className="text-[--text-secondary] mt-4 max-w-xl mx-auto text-lg">{t('When artisans earn fairly and sell directly, entire communities thrive — and centuries-old crafts find new life across the world.')}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {impacts.map((impact, i) => (
                            <div key={i} className="glass rounded-2xl p-6 card-hover">
                                <div className="w-10 h-10 rounded-xl border border-[--border-warm] bg-[--beige] flex items-center justify-center font-display font-bold text-[--terracotta] text-sm mb-3">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="font-semibold text-lg text-[--text-primary] mb-2">{t(impact.title)}</h3>
                                <p className="text-[--text-secondary] text-sm leading-relaxed">{t(impact.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4" style={{ backgroundColor: '#702828', color: 'white' }}>
                <div className="max-w-3xl mx-auto">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float" style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.12), rgba(244,160,38,0.08))' }}>
                        <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none">
                            <ellipse cx="25" cy="34" rx="14" ry="10" fill="#702828" opacity="0.12" />
                            <path d="M25 4 C14 4 11 16 14 24 L25 44 L36 24 C39 16 36 4 25 4Z" fill="#702828" />
                            <path d="M19 18 Q25 12 31 18" stroke="#F4A026" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">{t('Empower Your Craft')}</h2>
                    <p className="text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
                        {t('Join thousands of artisans already growing their business online with KalaKrit. Free to start. Takes two minutes. Built entirely for you.')}
                    </p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2.5 px-10 py-5 rounded-2xl text-white font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1"
                        style={{ background: 'linear-gradient(135deg, #DC143C, #CD5C5C)' }}
                    >
                        <Mic size={22} /> {t('Start Selling For Free')}
                    </Link>
                    <p className="text-white/70 mt-4">{t('No credit card required — No technical skills needed')}</p>
                </div>
            </section>

            {/* Footer - Clean and Simple */}
            <footer className="py-16 px-4" style={{ backgroundColor: '#702828', color: 'white' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-semibold text-2xl mb-8">Coming Soon: Expanding Your Business Ecosystem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div>
                            <h4 className="font-medium text-lg mb-3">Micro-financing</h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Access to small business loans and credit lines tailored for artisans and craft entrepreneurs.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-lg mb-3">Insurance</h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Comprehensive coverage for your craft business, inventory, and marketplace operations.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-lg mb-3">Events</h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Virtual and physical craft fairs, workshops, and networking opportunities for artisans.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/20">
                        <p className="text-white/60 text-sm">
                            © 2024 Kalakrit. Empowering artisans with AI-driven commerce.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
