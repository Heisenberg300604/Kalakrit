import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
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

const timelineSteps = [
    { num: '१', title: 'Voice Onboarding', desc: 'Speak your craft in your language' },
    { num: '२', title: 'AI Story Creation', desc: 'Heritage crafted into narratives' },
    { num: '३', title: 'Multi-Platform Listing', desc: 'Publish once, reach everywhere' },
    { num: '४', title: 'Market Intelligence', desc: 'AI-driven pricing and insights' },
    { num: '५', title: 'Global Commerce', desc: 'Artisan to world market' },
];

const metrics = [
    { value: '2M+', label: 'Artisans Empowered' },
    { value: '3.4x', label: 'Average Income Growth' },
    { value: '28', label: 'Languages Supported' },
    { value: '150+', label: 'Global Marketplaces' },
];

const SectionFadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const current = document.getElementById(`fade-${delay}`);
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [delay]);

    return (
        <div
            id={`fade-${delay}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay * 0.1}s`,
            }}
        >
            {children}
        </div>
    );
};

export default function LandingPageNew() {
    const { lang, setLang } = useLang();
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    // Removed unused mobile menu state
    const [selectedTab, setSelectedTab] = useState('story');
    
    // Form state for all tabs
    const [formData, setFormData] = useState({
        story: { artisanVoice: '', targetAudience: 'Global Online Buyers', tone: 'Warm & Authentic' },
        listing: { craftType: 'Banarasi Silk Saree', platform: 'Amazon/Flipkart', productDetails: '' },
        pricing: { craftCategory: 'Handloom Textile', hoursOfWork: '', materialCost: '10', sellingPrice: '' },
        trendBridge: { traditionalCraft: 'Madhubani / Mithila Art', targetMarket: 'Home Décor & Interiors' }
    });
    
    const [demoResponse, setDemoResponse] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);
    
    const handleFormChange = (tab: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [tab]: { ...prev[tab as keyof typeof prev], [field]: value }
        }));
    };
    
    const generateMockResponse = (tab: string) => {
        const data = formData[tab as keyof typeof formData];
        
        if (tab === 'story') {
            const story = data as typeof formData.story;
            return `✨ Your Heritage Story:\n\n"${story.artisanVoice.slice(0, 50) || 'Your craft'} speaks of generations of tradition. Tailored for ${story.targetAudience}, your narrative carries a ${story.tone} essence that resonates with discerning buyers worldwide. Let your artisan voice echo from workshop to world market."`;
        } else if (tab === 'listing') {
            const listing = data as typeof formData.listing;
            return `📦 Premium Listing Generated:\n\n${listing.craftType}\n⭐ Handcrafted Excellence\n✦ Platform: ${listing.platform}\n📝 Details: ${listing.productDetails || 'Hand-woven with finest materials'}\n💎 Category: Premium Artisan Collection\n🌍 Global Reach Enabled`;
        } else if (tab === 'pricing') {
            const pricing = data as typeof formData.pricing;
            const matCost = parseInt(pricing.materialCost) || 10;
            const recPrice = Math.round(matCost * 3.5);
            return `💰 Pricing Analysis:\n\nCraft: ${pricing.craftCategory}\nMaterial Cost: ₹${matCost}\n📊 Recommended Selling Price: ₹${recPrice}\n✓ Margin: ${((recPrice - matCost) / recPrice * 100).toFixed(0)}%\n⏱️  Labor: ${pricing.hoursOfWork || '40-80'} hours valued\n🎯 Market Positioning: Premium`;
        } else if (tab === 'trendBridge') {
            const trend = data as typeof formData.trendBridge;
            return `🌟 Trend Opportunities:\n\nTradition: ${trend.traditionalCraft}\nMarket: ${trend.targetMarket}\n\n🎨 Emerging Trends:\n• Sustainable artisan premium segment (↑ 340%)\n• Digital-first heritage appreciation\n• Fusion with contemporary design\n\n🚀 Your positioning: Strong in trending segment`;
        }
        return 'Response generated';
    };
    
    const handleSubmit = (tab: string) => {
        if (tab === 'story' && !formData.story.artisanVoice.trim()) {
            alert('Please fill in your artisan voice');
            return;
        }
        
        setIsGenerating(true);
        setTimeout(() => {
            const response = generateMockResponse(tab);
            setDemoResponse(response);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen overflow-hidden">
            {/* ========== HERO SECTION (Light) ========== */}
            <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative" style={{ backgroundColor: '#F5F2EA' }}>
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at 20% 50%, rgba(216, 92, 48, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(203, 160, 82, 0.08) 0%, transparent 50%)'
                }}></div>
                
                {/* Subtle background texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(216, 92, 48, 0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }}></div>

                {/* Navigation */}
                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`} style={{ 
                    backgroundColor: scrolled ? 'rgba(245, 242, 234, 0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none'
                }}>
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#DD5E36' }}></div>
                            <span className="font-display text-2xl font-bold" style={{ color: '#1A110A' }}>Kalakrit</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/marketplace" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#1A110A' }}>Marketplace</Link>
                            <a href="#features" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#1A110A' }}>Features</a>
                            <a href="#timeline" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#1A110A' }}>Journey</a>
                            <a href="#impact" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#1A110A' }}>Impact</a>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setShowLangMenu(!showLangMenu)}
                                    className="text-sm px-3 py-2 rounded-full border transition-colors flex items-center gap-2"
                                    style={{ borderColor: '#DD5E36', color: '#1A110A' }}
                                >
                                    <Languages size={14} />
                                    {languages.find(l => l.code === lang)?.native}
                                </button>
                                {showLangMenu && (
                                    <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg border" style={{ backgroundColor: '#1A110A', borderColor: '#DD5E36' }}>
                                        {languages.map(l => (
                                            <button
                                                key={l.code}
                                                onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                style={{ color: lang === l.code ? '#DD5E36' : '#F5F2EA' }}
                                            >
                                                {l.native}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {user ? (
                                <Link to="/dashboard" className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#DD5E36' }}>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:block text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#1A110A' }}>Log in</Link>
                                    <Link to="/signup" className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#DD5E36' }}>
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="flex-1 flex items-center justify-center px-6 relative z-10">
                    <SectionFadeIn delay={0}>
                        <div className="max-w-5xl w-full text-center space-y-8">
                            {/* Eyebrow Badge */}
                            <div>
                                <span className="inline-block px-4 py-2 rounded-full border text-xs font-medium tracking-widest uppercase" style={{ 
                                    borderColor: '#331414', 
                                    color: '#331414', 
                                    backgroundColor: 'transparent' 
                                }}>
                                    Launching Soon
                                </span>
                            </div>
                            
                            {/* Main Heading */}
                            <h1 className="font-display font-normal text-5xl md:text-6xl lg:text-7xl leading-tight">
                                <span style={{ color: '#1A110A' }}>From local streets to global feeds.</span><br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #DD5E36 0%, #C89B48 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Turning Tradition into Trends.</span>
                            </h1>

                            {/* Animated Subtext - 3-Step Sequential Animation */}
                            <div className="relative w-full h-24 flex items-center justify-center">
                                {/* STATE 1: MAKE IT - Weaving */}
                                <div className="hero-subtext-state">
                                    <div className="text-center w-full flex flex-col items-center justify-center">
                                        <div className="text-lg font-mono font-bold tracking-widest uppercase mb-4" style={{ color: '#331414'}}>
                                            Make It. 
                                        </div>
                                        <div className="flex justify-center items-end gap-2 h-12">
                                            {/* Weaving SVG Strokes */}
                                            <svg width="60" height="40" viewBox="0 0 60 40" style={{ overflow: 'visible' }}>
                                                <line x1="10" y1="10" x2="50" y2="30" stroke="#331414" strokeWidth="1.5" className="weave-stroke1" vectorEffect="non-scaling-stroke" />
                                                <line x1="50" y1="10" x2="10" y2="30" stroke="#331414" strokeWidth="1.5" className="weave-stroke2" vectorEffect="non-scaling-stroke" />
                                                <line x1="30" y1="5" x2="30" y2="35" stroke="#331414" strokeWidth="1" opacity="0.6" className="weave-stroke1" style={{ animationDelay: '0.4s' }} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* STATE 2: MIC IT - Audio Visualizer */}
                                <div className="hero-subtext-state">
                                    <div className="text-center w-full flex flex-col items-center justify-center">
                                        <div className="text-lg font-mono font-bold tracking-widest uppercase mb-4" style={{ color: '#331414'}}>
                                            Mic It.
                                        </div>
                                        <div className="flex justify-center items-end gap-1 h-12">
                                            <div className="audio-bar1 w-1 rounded-sm" style={{ backgroundColor: '#331414', minHeight: '10px' }}></div>
                                            <div className="audio-bar2 w-1 rounded-sm" style={{ backgroundColor: '#331414', minHeight: '10px' }}></div>
                                            <div className="audio-bar3 w-1 rounded-sm" style={{ backgroundColor: '#331414', minHeight: '10px' }}></div>
                                            <div className="audio-bar4 w-1 rounded-sm" style={{ backgroundColor: '#331414', minHeight: '10px' }}></div>
                                            <div className="audio-bar5 w-1 rounded-sm" style={{ backgroundColor: '#331414', minHeight: '10px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* STATE 3: MARKET IT - Ripple/Network */}
                                <div className="hero-subtext-state">
                                    <div className="text-center w-full flex flex-col items-center justify-center">
                                        <div className="text-lg font-mono font-bold tracking-widest uppercase mb-4" style={{ color: '#331414' }}>
                                            MARKET IT.
                                        </div>
                                        <div className="flex justify-center items-center h-12">
                                            <svg width="60" height="40" viewBox="0 0 60 40" style={{ overflow: 'visible' }}>
                                                {/* Central dot */}
                                                <circle cx="30" cy="20" r="4" fill="#331414" />
                                                {/* Ripple 1 */}
                                                <circle cx="30" cy="20" r="8" fill="none" stroke="#331414" strokeWidth="1" className="ripple1" style={{ animation: 'ripple1 2.5s ease-out infinite' }} vectorEffect="non-scaling-stroke" />
                                                {/* Ripple 2 */}
                                                <circle cx="30" cy="20" r="8" fill="none" stroke="#331414" strokeWidth="1" className="ripple2" style={{ animation: 'ripple2 2.5s ease-out infinite' }} vectorEffect="non-scaling-stroke" />
                                                {/* Ripple 3 */}
                                                <circle cx="30" cy="20" r="8" fill="none" stroke="#331414" strokeWidth="1" className="ripple3" style={{ animation: 'ripple3 2.5s ease-out infinite' }} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button Group */}
                            <div className="flex flex-row gap-4 justify-center mt-8">
                                <a
                                    href="#demo"
                                    className="px-8 py-4 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                                    style={{ backgroundColor: '#331414' }}
                                >
                                    ✦ Experience Live Demo
                                </a>
                                <Link
                                    to="/signup"
                                    className="px-8 py-4 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                                    style={{ 
                                        borderColor: '#331414', 
                                        color: '#F5F2EA',
                                        backgroundColor: '#331414'
                                    }}
                            
                                   
                                >
                                    Start Your Legacy
                                </Link>
                            </div>
                        </div>
                    </SectionFadeIn>
                </div>
                
                {/* Corner Micro-Typography */}
                <div className="absolute bottom-16 left-6 z-10">
                    <div className="text-xs font-mono tracking-wider" style={{ color: '#8A7B70', fontSize: '11px' }}>
                        PROJECT AETHERION // INNERVE HACKS 2026
                    </div>
                </div>
                <div className="absolute bottom-16 right-6 z-10">
                    <div className="text-xs font-mono tracking-wider" style={{ color: '#8A7B70', fontSize: '11px' }}>
                        INITIATIVE: EMPOWERING 200M+ ARTISANS
                    </div>
                </div>
                
                {/* Infinite Scrolling Marquee */}
                <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center overflow-hidden" style={{ backgroundColor: '#E8D5B7' }}>
                    <div className="whitespace-nowrap animate-marquee text-sm font-medium tracking-widest uppercase" style={{ color: '#331414' }}>
                        KALA ✦ KATHAN ✦ KAROBAAR ✦ ZERO UI COMMERCE ✦ GLOBAL REACH ✦ KALA ✦ KATHAN ✦ KAROBAAR ✦ ZERO UI COMMERCE ✦ GLOBAL REACH ✦ KALA ✦ KATHAN ✦ KAROBAAR ✦ ZERO UI COMMERCE ✦ GLOBAL REACH ✦
                    </div>
                </div>
            </section>

            {/* ========== MISSION SECTION (Dark) ========== */}
            <section className="py-32 px-6 transition-colors duration-1000" style={{ backgroundColor: '#331414' }}>
                <SectionFadeIn delay={0}>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-display font-normal mb-8" style={{ color: '#F5F2EA', fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1.1' }}>
                            Where Heritage Meets <span className="italic" style={{ color: '#C89B48' }}>the Digital Age</span>
                        </h2>

                        <div className="mb-12 text-opacity-50 transition-all duration-1000" style={{ color: '#F5F2EA', fontSize: '2rem', fontWeight: '300', lineHeight: '1.2' }}>
                            Kalakrit — The Artisan's Platform
                        </div>

                        <p className="max-w-3xl text-lg leading-relaxed transition-colors duration-1000" style={{ color: '#F5F2EA' }}>
                            Kalakrit is an AI-powered marketplace that amplifies the voices of India's artisans. We believe in heritage without boundaries—where traditional crafts find global markets, artisans receive fair compensation, and stories of cultural legacy are celebrated worldwide.
                        </p>
                    </div>
                </SectionFadeIn>
            </section>

            {/* ========== FEATURES HEADING (Light) ========== */}
            <section id="features" className="py-24 px-6 transition-colors duration-1000" style={{ backgroundColor: '#F5F2EA' }}>
                <SectionFadeIn delay={0}>
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-6 text-sm font-medium tracking-widest transition-colors duration-500" style={{ color: '#331414' }}>
                            PLATFORM FEATURES
                        </div>
                        <h2 className="font-display font-normal mb-16" style={{ color: '#1A110A', fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: '1.1' }}>
                            Eight Ways AI <span className="italic" style={{ color: '#B98985' }}>Empowers</span> Every Artisan
                        </h2>
                    </div>
                </SectionFadeIn>

                {/* Feature Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { num: '01', title: 'Voice-to-Listing', desc: 'Speak. AI writes.' },
                        { num: '02', title: 'AI Storytelling', desc: 'Heritage becomes narrative.' },
                        { num: '03', title: 'Smart Pricing', desc: 'Data meets wisdom.' },
                        { num: '04', title: 'Multi-Marketplace', desc: 'Publish once, everywhere.' },
                        { num: '05', title: 'Market Intelligence', desc: 'Trends at your fingertips.' },
                        { num: '06', title: '360° Showcase', desc: 'Products come alive.' },
                        { num: '07', title: 'Global Export', desc: 'Reach 150+ platforms.' },
                        { num: '08', title: 'Artisan Support', desc: 'AI mentor, always ready.' },
                    ].map((item, idx) => (
                        <SectionFadeIn key={item.num} delay={idx}>
                            <div className="p-8 border rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform" style={{ borderColor: '#D85C30', backgroundColor: 'rgba(216, 92, 48, 0.08)' }}>
                                <div className="text-2xl font-bold mb-3" style={{ color: '#D85C30' }}>{item.num}</div>
                                <h4 className="font-display text-lg mb-2" style={{ color: '#1A110A' }}>{item.title}</h4>
                                <p className="text-sm" style={{ color: '#D85C30' }}>{item.desc}</p>
                            </div>
                        </SectionFadeIn>
                    ))}
                </div>
            </section>

            {/* ========== LIVE AI DEMONSTRATION (Dark) ========== */}
            <section id="demo" className="py-32 px-6 transition-colors duration-1000" style={{ backgroundColor: '#331414' }}>
                <SectionFadeIn delay={0}>
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <p className="text-xs font-medium tracking-widest mb-6 uppercase" style={{ color: '#C89B48' }}>
                                LIVE AI DEMONSTRATION
                            </p>
                            <h2 className="font-display font-normal" style={{ color: '#F5F2EA', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: '1.1' }}>
                                Experience the <span className="italic" style={{ color: '#C89B48' }}>Intelligence</span>
                            </h2>
                        </div>

                        {/* Tabbed Card */}
                        <div className="rounded-2xl p-8 transition-all duration-500" style={{ backgroundColor: '#5D3D3D', border: '1px solid #331414' }}>
                            
                            {/* Tab Navigation */}
                            <div className="flex gap-1 mb-10 border-b overflow-x-auto pb-0" style={{ borderColor: '#331414' }}>
                                {[
                                    { id: 'story', label: '✦ Story Weaver' },
                                    { id: 'listing', label: '✦ Listing Generator' },
                                    { id: 'pricing', label: '✦ Pricing Coach' },
                                    { id: 'trendBridge', label: '✦ Trend Bridge' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSelectedTab(tab.id)}
                                        className="pb-4 px-5 font-medium text-sm transition-all duration-300 border-b-4 whitespace-nowrap hover:opacity-80"
                                        style={{
                                            color: selectedTab === tab.id ? '#C89B48' : '#F5F2EA',
                                            borderColor: selectedTab === tab.id ? '#C89B48' : 'transparent'
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-6 transition-all duration-300">
                                
                                {/* TAB 1: Story Weaver */}
                                {selectedTab === 'story' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        {demoResponse ? (
                                            <>
                                                <div className="p-6 rounded-lg transition-all duration-300" style={{ backgroundColor: 'rgba(221, 94, 54, 0.08)', border: '1px solid #DD5E36' }}>
                                                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: '#F5F2EA', fontSize: '0.95rem' }}>
                                                        {demoResponse}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => setDemoResponse(null)}
                                                    className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                                    style={{ backgroundColor: '#DD5E36', opacity: 0.85 }}
                                                >
                                                    ← Generate Another
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>ARTISAN'S VOICE — DESCRIBE YOUR CRAFT (ANY LANGUAGE)</label>
                                                    <textarea
                                                        placeholder="मेरा नाम रमेश है और मैं वाराणसी में बनारसी साड़ियाँ बनाता हूँ... Or in English: I am a Madhubani painter..."
                                                        value={formData.story.artisanVoice}
                                                        onChange={(e) => handleFormChange('story', 'artisanVoice', e.target.value)}
                                                        className="w-full p-4 rounded-lg transition-all duration-300 focus:outline-none"
                                                        style={{ 
                                                            backgroundColor: '#160C06', 
                                                            color: '#F5F2EA',
                                                            borderLeft: '3px solid #DD5E36',
                                                            border: '1px solid #3A2A1E',
                                                            borderLeftWidth: '3px'
                                                        }}
                                                        rows={6}
                                                    />
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>TARGET AUDIENCE</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.story.targetAudience}
                                                            onChange={(e) => handleFormChange('story', 'targetAudience', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>TONE</label>
                                                        <input 
                                                            type="text"
                                                            value={formData.story.tone}
                                                            onChange={(e) => handleFormChange('story', 'tone', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleSubmit('story')}
                                                    disabled={!formData.story.artisanVoice.trim() || isGenerating}
                                                    className="w-full py-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    style={{ backgroundColor: '#DD5E36' }}
                                                >
                                                    {isGenerating ? '✦ Weaving...' : '✦ Weave My Story with AI'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* TAB 2: Listing Generator */}
                                {selectedTab === 'listing' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        {demoResponse ? (
                                            <>
                                                <div className="p-6 rounded-lg transition-all duration-300" style={{ backgroundColor: 'rgba(221, 94, 54, 0.08)', border: '1px solid #DD5E36' }}>
                                                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: '#F5F2EA', fontSize: '0.95rem' }}>
                                                        {demoResponse}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => setDemoResponse(null)}
                                                    className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                                    style={{ backgroundColor: '#DD5E36', opacity: 0.85 }}
                                                >
                                                    ← Generate Another
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>CRAFT TYPE</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.listing.craftType}
                                                            onChange={(e) => handleFormChange('listing', 'craftType', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>PLATFORM</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.listing.platform}
                                                            onChange={(e) => handleFormChange('listing', 'platform', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>PRODUCT DETAILS</label>
                                                    <textarea
                                                        placeholder="e.g. Hand-woven, pure silk, red and gold zari work..."
                                                        value={formData.listing.productDetails}
                                                        onChange={(e) => handleFormChange('listing', 'productDetails', e.target.value)}
                                                        className="w-full p-4 rounded-lg transition-all duration-300 focus:outline-none"
                                                        style={{ 
                                                            backgroundColor: '#160C06', 
                                                            color: '#F5F2EA',
                                                            borderLeft: '3px solid #DD5E36',
                                                            border: '1px solid #3A2A1E',
                                                            borderLeftWidth: '3px'
                                                        }}
                                                        rows={5}
                                                    />
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleSubmit('listing')}
                                                    disabled={!formData.listing.craftType.trim() || isGenerating}
                                                    className="w-full py-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    style={{ backgroundColor: '#DD5E36' }}
                                                >
                                                    {isGenerating ? '✦ Generating...' : '✦ Generate Complete Listing'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* TAB 3: Pricing Coach */}
                                {selectedTab === 'pricing' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        {demoResponse ? (
                                            <>
                                                <div className="p-6 rounded-lg transition-all duration-300" style={{ backgroundColor: 'rgba(221, 94, 54, 0.08)', border: '1px solid #DD5E36' }}>
                                                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: '#F5F2EA', fontSize: '0.95rem' }}>
                                                        {demoResponse}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => setDemoResponse(null)}
                                                    className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                                    style={{ backgroundColor: '#DD5E36', opacity: 0.85 }}
                                                >
                                                    ← Generate Another
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>CRAFT CATEGORY</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.pricing.craftCategory}
                                                            onChange={(e) => handleFormChange('pricing', 'craftCategory', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>HOURS OF WORK</label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="e.g. 72"
                                                            value={formData.pricing.hoursOfWork}
                                                            onChange={(e) => handleFormChange('pricing', 'hoursOfWork', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>MATERIAL COST (₹)</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.pricing.materialCost}
                                                            onChange={(e) => handleFormChange('pricing', 'materialCost', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>CURRENT SELLING PRICE (₹)</label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="e.g. 2500"
                                                            value={formData.pricing.sellingPrice}
                                                            onChange={(e) => handleFormChange('pricing', 'sellingPrice', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleSubmit('pricing')}
                                                    disabled={!formData.pricing.materialCost.trim() || isGenerating}
                                                    className="w-full py-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    style={{ backgroundColor: '#DD5E36' }}
                                                >
                                                    {isGenerating ? '✦ Analyzing...' : '✦ Analyze My Pricing'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* TAB 4: Trend Bridge */}
                                {selectedTab === 'trendBridge' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        {demoResponse ? (
                                            <>
                                                <div className="p-6 rounded-lg transition-all duration-300" style={{ backgroundColor: 'rgba(221, 94, 54, 0.08)', border: '1px solid #DD5E36' }}>
                                                    <p className="leading-relaxed whitespace-pre-wrap" style={{ color: '#F5F2EA', fontSize: '0.95rem' }}>
                                                        {demoResponse}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => setDemoResponse(null)}
                                                    className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                                    style={{ backgroundColor: '#C89B48', opacity: 0.85 }}
                                                >
                                                    ← Generate Another
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>YOUR TRADITIONAL CRAFT / ART FORM</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.trendBridge.traditionalCraft}
                                                            onChange={(e) => handleFormChange('trendBridge', 'traditionalCraft', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium tracking-widest mb-3 block" style={{ color: '#C89B48' }}>TARGET MARKET SEGMENT</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.trendBridge.targetMarket}
                                                            onChange={(e) => handleFormChange('trendBridge', 'targetMarket', e.target.value)}
                                                            className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none"
                                                            style={{ 
                                                                backgroundColor: '#160C06', 
                                                                color: '#F5F2EA',
                                                                border: '1px solid #3A2A1E'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleSubmit('trendBridge')}
                                                    disabled={!formData.trendBridge.traditionalCraft.trim() || isGenerating}
                                                    className="w-full py-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    style={{ backgroundColor: '#DD5E36' }}
                                                >
                                                    {isGenerating ? '✦ Discovering...' : '✦ Find My Trend Connections'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </SectionFadeIn>
            </section>

            {/* ========== ARTISAN JOURNEY TIMELINE (Light) ========== */}
            <section id="timeline" className="py-32 px-6 transition-colors duration-1000" style={{ backgroundColor: '#F5F2EA' }}>
                <SectionFadeIn delay={0}>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-display font-normal mb-24 text-center" style={{ color: '#331414', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: '1.1' }}>
                            From Workshop to <span className="italic" style={{ color: '#B98985' }}>World Market</span>
                        </h2>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-1 transition-colors duration-1000" style={{ backgroundColor: 'rgba(185, 137, 133, 0.3)', transform: 'translateY(-50%)' }}></div>

                            {/* Steps */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                                {timelineSteps.map((step, idx) => (
                                    <SectionFadeIn key={idx} delay={idx}>
                                        <div className="text-center">
                                            {/* Circle */}
                                            <div className="flex justify-center mb-6">
                                                <div
                                                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 transition-all duration-300 hover:shadow-lg hover:scale-110 cursor-pointer transform"
                                                    style={{ borderColor: '#331414', backgroundColor: 'rgba(185, 137, 133, 0.1)', color: '#331414' }}
                                                >
                                                    {step.num}
                                                </div>
                                            </div>

                                            {/* Text */}
                                            <h4 className="font-display text-lg mb-2" style={{ color: '#331414' }}>{step.title}</h4>
                                            <p className="text-sm" style={{ color: '#B98985' }}>{step.desc}</p>
                                        </div>
                                    </SectionFadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionFadeIn>
            </section>

            {/* ========== IMPACT METRICS (Dark) ========== */}
            <section id="impact" className="py-32 px-6 transition-colors duration-1000" style={{ backgroundColor: '#7D5252' }}>
                <SectionFadeIn delay={0}>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-display font-normal mb-20 text-center" style={{ color: '#331414', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: '1.1' }}>
                            Reviving Traditions, <br /> Securing Futures
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {metrics.map((metric, idx) => (
                                <SectionFadeIn key={idx} delay={idx}>
                                    <div className="text-center p-8 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-105 transform" style={{ borderColor: '#331414', backgroundColor: 'rgba(185, 137, 133, 0.08)' }}>
                                        <div className="font-display font-bold mb-4" style={{ color: '#331414', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                                            {metric.value}
                                        </div>
                                        <p className="text-sm transition-colors duration-500" style={{ color: '#331414' }}>{metric.label}</p>
                                    </div>
                                </SectionFadeIn>
                            ))}
                        </div>
                    </div>
                </SectionFadeIn>
            </section>

            {/* ========== FOOTER (Dark Premium) ========== */}
            <section className="transition-colors duration-1000 py-24" style={{ backgroundColor: '#331414' }}>
                <div className="max-w-6xl mx-auto px-6">
                    {/* Top Border */}
                    <div className="border-t mb-16" style={{ borderColor: '#6B4D4D' }}></div>

                    {/* Top Section: Massive CTA */}
                    <div className="text-center mb-24">
                        <h2 className="font-display font-normal mb-8" style={{ color: '#F5F2EA', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: '1.1' }}>
                            Ready to unmute<br />
                            <span className="italic" style={{ color: '#B98985' }}>your craft?</span>
                        </h2>

                        {/* Email Input & Button */}
                        <div className="flex flex-col md:flex-row gap-3 justify-center items-center mt-8">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-3 rounded-lg focus:outline-none transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(90, 61, 61, 0.5)',
                                    color: '#F5F2EA',
                                    border: '1px solid #6B4D4D',
                                    borderBottom: '2px solid #B98985',
                                    flex: '1',
                                    maxWidth: '400px'
                                }}
                            />
                            <button
                                className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
                                style={{ backgroundColor: '#B98985' }}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </div>

                    {/* Middle Section: Ecosystem Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
                        {/* Column 1: Brand */}
                        <div>
                            <div className="font-display text-3xl font-bold mb-4" style={{ color: '#F5F2EA' }}>
                                Kalakrit.
                            </div>
                            <p className="text-sm" style={{ color: '#C89B48', letterSpacing: '0.1em' }}>
                                Kala ✦ Kathan ✦ Karobaar
                            </p>
                        </div>

                        {/* Column 2: Platform */}
                        <div>
                            <h4 className="font-medium text-sm tracking-widest mb-6 uppercase" style={{ color: '#B98985' }}>
                                Platform
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Voice-to-Listing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        AI Pricing Coach
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Trend Bridge
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Global Showcase
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Creator Ecosystem */}
                        <div>
                            <h4 className="font-medium text-sm tracking-widest mb-6 uppercase" style={{ color: '#B98985' }}>
                                Creator Ecosystem
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Micro-Financing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Craft Insurance
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Verified Suppliers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5F2EA' }}>
                                        Community Events
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Border & Sign-off */}
                    <div className="border-t pt-12 mb-8" style={{ borderColor: '#6B4D4D' }}></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Left: Copyright */}
                        <p className="text-xs tracking-widest uppercase" style={{ color: '#9B8278' }}>
                            © 2026 KALAKRIT. EMPOWERING 200M+ ARTISANS.
                        </p>

                        {/* Right: Built With */}
                        <p className="text-xs font-mono" style={{ color: '#9B8278' }}>
                            BUILT BY TEAM AETHERION
                            
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
