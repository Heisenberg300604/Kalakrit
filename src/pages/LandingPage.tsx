import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Mic, ChevronRight, Globe, BookOpen, TrendingUp, Package,
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
    { num: '01', title: 'Speak in Your Language', desc: 'Press the microphone and describe your product in Hindi, Tamil, Telugu, Bengali, or English — exactly how you would tell a customer.' },
    { num: '02', title: 'AI Generates the Listing', desc: 'Our AI instantly writes a professional product title, detailed description, and relevant tags — no typing needed.' },
    { num: '03', title: 'AI Suggests Your Price', desc: 'Get data-backed price recommendations derived from demand trends, competitor data, and seasonal patterns.' },
    { num: '04', title: 'AI Writes Your Craft Story', desc: 'A rich narrative is generated highlighting the heritage, technique, and artisan behind the product.' },
    { num: '05', title: 'Publish Everywhere', desc: 'Your listing goes live across Amazon, Etsy, Flipkart, and Meesho with a single button — reach millions of buyers.' },
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
    const { lang, setLang } = useLang();
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2.5">
                            <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                                <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                                <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                                <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-display text-xl font-bold text-[--terracotta]">KalaKrit</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/marketplace" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors font-medium">Marketplace</Link>
                            <a href="#features" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">Features</a>
                            <a href="#how-it-works" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">How it Works</a>
                            <a href="#impact" className="text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors">Impact</a>
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
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:block text-sm text-[--text-secondary] hover:text-[--terracotta] transition-colors font-medium">Log in</Link>
                                    <Link to="/signup" className="text-sm px-4 py-2 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        Get Started
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
                                {item}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="gradient-hero mandala-pattern min-h-screen flex items-center justify-center px-4 pt-16">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[--border-warm] text-sm font-medium text-[--terracotta] mb-8 shadow-sm animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                        Voice-First · AI-Powered · Built for Indian Artisans
                    </div>

                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[--text-primary] mb-6 leading-tight animate-fade-in-up stagger-1">
                        Your <span style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Craft</span>,{' '}
                        Your <span style={{ background: 'linear-gradient(135deg, #3D52A0, #7091E6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Voice</span>,{' '}
                        Global Markets.
                    </h1>

                    <p className="text-lg sm:text-xl text-[--text-secondary] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
                        Speak in your mother tongue. Our AI creates professional listings, suggests fair prices, and publishes your craft to Amazon, Etsy, and more — in under 60 seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3">
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                            style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}
                        >
                            <Mic size={20} /> Start Selling with Voice
                        </Link>
                        <a
                            href="#how-it-works"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg glass border border-[--border-warm] text-[--terracotta] hover:-translate-y-1 transition-all"
                        >
                            See How It Works <ChevronRight size={18} />
                        </a>
                    </div>

                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up stagger-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="glass rounded-2xl p-4 card-hover">
                                <div className="font-display text-2xl sm:text-3xl font-bold text-[--terracotta]">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-[--text-secondary] mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-terracotta inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4">The Problem</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary]">Why Artisans Stay Invisible Online</h2>
                        <p className="text-[--text-secondary] text-lg mt-4 max-w-2xl mx-auto">
                            Despite making world-class crafts, millions of Indian artisans are cut off from digital markets — not because of their talent, but due to structural barriers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {problems.map((p, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-[--border-warm] hover:shadow-lg transition-all card-hover bg-gradient-to-br from-white to-[--warm-white]">
                                <div className="w-10 h-10 rounded-xl bg-[--beige] flex items-center justify-center mb-3 text-[--terracotta] font-bold font-display text-lg border border-[--border-warm]">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="font-semibold text-lg text-[--text-primary] mb-2">{p.title}</h3>
                                <p className="text-[--text-secondary] text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 px-4 gradient-warm">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-saffron inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4">How It Works</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary]">From Voice to Live Listing in 60 Seconds</h2>
                    </div>
                    <div className="space-y-6">
                        {steps.map((s, i) => (
                            <div key={i} className={`flex gap-5 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-white text-sm shadow-lg" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        {s.num}
                                    </div>
                                </div>
                                <div className="glass rounded-2xl p-5 flex-1 card-hover border border-[--border-warm]">
                                    <h3 className="font-semibold text-lg text-[--text-primary] mb-1.5">{s.title}</h3>
                                    <p className="text-[--text-secondary] text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-indigo inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4">Features</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary]">Everything an Artisan Needs to Succeed Online</h2>
                        <p className="text-[--text-secondary] mt-4 max-w-xl mx-auto">Built from the ground up for artisans who create beautiful things but shouldn't have to worry about the digital complexity of selling them.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="group p-5 rounded-2xl border border-[--border-warm] hover:shadow-xl transition-all card-hover cursor-default bg-white">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="font-semibold text-[--text-primary] mb-2">{f.title}</h3>
                                    <p className="text-sm text-[--text-secondary] leading-relaxed">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-24 px-4" style={{ background: 'linear-gradient(135deg, #1A0A00 0%, #3D1C00 100%)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 badge-saffron">Impact</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                            Transforming Lives,<br />Preserving Heritage
                        </h2>
                        <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg">When artisans earn fairly and sell directly, entire communities thrive — and centuries-old crafts find new life across the world.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {impacts.map((impact, i) => (
                            <div key={i} className="glass-dark rounded-2xl p-6 card-hover">
                                <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center font-display font-bold text-[--saffron] text-sm mb-3">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="font-semibold text-lg text-white mb-2">{impact.title}</h3>
                                <p className="text-white/65 text-sm leading-relaxed">{impact.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 gradient-warm text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float" style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.12), rgba(244,160,38,0.08))' }}>
                        <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none">
                            <ellipse cx="25" cy="34" rx="14" ry="10" fill="#C4622D" opacity="0.12" />
                            <path d="M25 4 C14 4 11 16 14 24 L25 44 L36 24 C39 16 36 4 25 4Z" fill="#C4622D" />
                            <path d="M19 18 Q25 12 31 18" stroke="#F4A026" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--text-primary] mb-4">Empower Your Craft</h2>
                    <p className="text-lg text-[--text-secondary] mb-10 max-w-xl mx-auto leading-relaxed">
                        Join thousands of artisans already growing their business online with KalaKrit. Free to start. Takes two minutes. Built entirely for you.
                    </p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2.5 px-10 py-5 rounded-2xl text-white font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1"
                        style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}
                    >
                        <Mic size={22} /> Start Selling For Free
                    </Link>
                    <p className="text-sm text-[--text-secondary] mt-4">No credit card required — No technical skills needed</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#140a05] text-white/80 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
                                    <ellipse cx="18" cy="24" rx="10" ry="7" fill="#F4A026" opacity="0.2" />
                                    <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#F4A026" />
                                    <path d="M14 14 Q18 10 22 14" stroke="white" strokeWidth="1.5" fill="none" />
                                </svg>
                                <span className="font-display text-xl font-bold text-white">KalaKrit</span>
                            </div>
                            <p className="text-sm text-white/55 leading-relaxed">AI-Powered Voice Marketplace for India's Local Artisans. Bridging Heritage and Digital Commerce.</p>
                        </div>
                        {[
                            { heading: 'Product', links: ['Voice Listing', 'AI Storytelling', 'Smart Pricing', 'Marketplace'] },
                            { heading: 'Company', links: ['About Us', 'Blog', 'Press', 'Careers'] },
                            { heading: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'] },
                        ].map((col) => (
                            <div key={col.heading}>
                                <h4 className="font-semibold text-white mb-3">{col.heading}</h4>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-white/45">© 2026 KalaKrit. Made with care for India's artisans.</p>
                        <div className="flex gap-5">
                            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((s) => (
                                <a key={s} href="#" className="text-sm text-white/55 hover:text-white transition-colors">{s}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
