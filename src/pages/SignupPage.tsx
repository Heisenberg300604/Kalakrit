import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mic, Loader2, ArrowLeft } from 'lucide-react';
import type { Language } from '../types';

const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
];

const crafts = [
    'Textiles & Weaving', 'Pottery & Ceramics', 'Metal Craft',
    'Folk Art & Painting', 'Jewelry Making', 'Woodwork',
    'Bamboo & Cane', 'Leather Craft', 'Stone Carving', 'Other',
];

export default function SignupPage() {
    const [lang, setLang] = useState<Language>('en');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    function handleNext(e: React.FormEvent) {
        e.preventDefault();
        setStep(2);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    }

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                        <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                            <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                            <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                            <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                        </svg>
                        <span className="font-display text-2xl font-bold text-[--terracotta]">KalaKrit</span>
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-[--text-primary]">Join as an Artisan</h1>
                    <p className="text-[--text-secondary] mt-2">Start your digital journey today — free forever</p>
                </div>

                {/* Step indicators */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2].map((s) => (
                        <div key={s} className={`flex items-center gap-2 ${s < 2 ? 'flex-1' : ''}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s ? 'text-white shadow' : 'text-[--text-secondary] border border-[--border-warm] bg-white'}`}
                                style={step >= s ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}
                            >
                                {s}
                            </div>
                            {s < 2 && <div className={`flex-1 h-0.5 transition-all ${step > s ? 'bg-[--terracotta]' : 'bg-[--border-warm]'}`}></div>}
                        </div>
                    ))}
                </div>

                <div className="glass rounded-3xl p-8 shadow-2xl border border-[--border-warm]">
                    {step === 1 ? (
                        <form onSubmit={handleNext} className="space-y-4">
                            <h2 className="font-semibold text-[--text-primary] text-lg mb-4">Your Basic Details</h2>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Full Name</label>
                                <input type="text" placeholder="e.g. Vartika Singh" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Email Address</label>
                                <input type="email" placeholder="your@email.com" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Phone Number</label>
                                <input type="tel" placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Preferred Language</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {languages.map((l) => (
                                        <button key={l.code} type="button" onClick={() => setLang(l.code)}
                                            className={`p-2 rounded-xl border text-xs font-medium transition-all ${lang === l.code ? 'border-[--terracotta] bg-[--terracotta] text-white' : 'border-[--border-warm] bg-white/60 text-[--text-secondary] hover:border-[--terracotta]/50'}`}>
                                            {l.native}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:shadow-lg hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                Continue
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="font-semibold text-[--text-primary] text-lg mb-4">About Your Craft</h2>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Type of Craft</label>
                                <select required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all">
                                    <option value="">Select your craft...</option>
                                    {crafts.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Your Location</label>
                                <input type="text" placeholder="e.g. Varanasi, Uttar Pradesh" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Password</label>
                                <input type="password" placeholder="Create a strong password" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-[--border-warm] text-[--text-secondary] font-semibold hover:bg-white/60 transition-all flex items-center justify-center gap-1.5">
                                    <ArrowLeft size={15} /> Back
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                    {loading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : <><Mic size={16} /> Start Selling</>}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 pt-4 border-t border-[--border-warm]">
                        <p className="text-center text-sm text-[--text-secondary]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[--terracotta] font-semibold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
