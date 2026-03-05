import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mic, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [craft, setCraft] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signUp(email, password, {
            name,
            phone,
            craft,
            location,
            language: lang,
        });
        if (error) {
            setError(error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // Auto-redirect after showing success message
            setTimeout(() => navigate('/login'), 2500);
        }
    }

    if (success) {
        return (
            <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
                <div className="w-full max-w-md glass rounded-3xl p-10 shadow-2xl border border-[--border-warm] text-center">
                    <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
                    <h2 className="font-display text-2xl font-bold text-[--text-primary] mb-2">Account Created!</h2>
                    <p className="text-[--text-secondary] text-sm mb-1">
                        Check your email to confirm your account, then sign in.
                    </p>
                    <p className="text-xs text-[--text-secondary]">Redirecting to login...</p>
                </div>
            </div>
        );
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

                <div className="glass rounded-3xl p-8 shadow-2xl border border-[--border-warm]">
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="font-semibold text-[--text-primary] text-lg mb-4">Your Details</h2>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Vartika Singh" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Phone Number</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Type of Craft</label>
                            <select value={craft} onChange={e => setCraft(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all">
                                <option value="">Select your craft...</option>
                                {crafts.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Your Location</label>
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Varanasi, Uttar Pradesh" required className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Preferred Language</label>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        type="button"
                                        onClick={() => setLang(l.code)}
                                        className={`px-3 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                                            lang === l.code
                                                ? 'border-[--terracotta] bg-[--terracotta] text-white shadow-sm'
                                                : 'border-[--border-warm] bg-white/60 text-[--text-secondary] hover:border-[--terracotta]/50'
                                        }`}
                                    >
                                        <span>{l.native}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password (min 6 chars)" required minLength={6} className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : <><Mic size={16} /> Create Account</>}
                        </button>
                    </form>

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
