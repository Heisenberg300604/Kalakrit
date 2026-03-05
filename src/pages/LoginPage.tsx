import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mic, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);
        if (error) {
            setError(error);
            setLoading(false);
        } else {
            navigate(from, { replace: true });
        }
    }

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
                            <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                            <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                            <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                        </svg>
                        <span className="font-display text-2xl font-bold text-[--terracotta]">KalaKrit</span>
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-[--text-primary]">Welcome Back</h1>
                    <p className="text-[--text-secondary] mt-2">Sign in to your artisan workspace</p>
                </div>

                <div className="glass rounded-3xl p-8 shadow-2xl border border-[--border-warm]">
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="e.g. vartika@kalakrit.in"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}
                        >
                            {loading ? (
                                <><Loader2 size={18} className="animate-spin" /> Signing in...</>
                            ) : (
                                <><Mic size={18} /> Sign In</>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[--border-warm]">
                        <p className="text-center text-sm text-[--text-secondary]">
                            New artisan?{' '}
                            <Link to="/signup" className="text-[--terracotta] font-semibold hover:underline">Create free account</Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-[--text-secondary] mt-6">
                    By continuing, you agree to our <a href="#" className="text-[--terracotta] hover:underline">Terms</a> and <a href="#" className="text-[--terracotta] hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
