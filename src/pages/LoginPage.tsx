import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mic, Loader2, Smartphone, KeyRound } from 'lucide-react';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1200);
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

                {/* Prototype demo notice */}
                <div className="mb-5 px-4 py-3.5 rounded-2xl border border-amber-300 bg-amber-50">
                    <p className="text-sm font-semibold text-amber-900 mb-1">Prototype — Demo Access</p>
                    <p className="text-sm text-amber-800 leading-relaxed">
                        This is a working prototype. Just type <strong>anything</strong> in the fields and press
                        Sign In to explore the full dashboard. No real account is needed at this stage.
                        Backend integration will follow after Round 1 selection.
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 shadow-2xl border border-[--border-warm]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Email or Phone</label>
                            <input
                                type="text"
                                placeholder="e.g. vartika@kalakrit.in"
                                className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[--text-primary] mb-1.5">Password</label>
                            <input
                                type="password"
                                placeholder="Type anything to proceed"
                                className="w-full px-4 py-3 rounded-xl border border-[--border-warm] bg-white/60 text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 focus:border-[--terracotta] transition-all"
                            />
                            <a href="#" className="text-xs text-[--terracotta] mt-1.5 block text-right hover:underline">Forgot password?</a>
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
                                <><Mic size={18} /> Sign In to Dashboard</>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[--border-warm]">
                        <p className="text-center text-sm text-[--text-secondary]">
                            New artisan?{' '}
                            <Link to="/signup" className="text-[--terracotta] font-semibold hover:underline">Create free account</Link>
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="relative flex items-center gap-3 my-4">
                            <div className="flex-1 border-t border-[--border-warm]"></div>
                            <span className="text-xs text-[--text-secondary]">or continue with</span>
                            <div className="flex-1 border-t border-[--border-warm]"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[--border-warm] text-sm text-[--text-secondary] hover:bg-white/60 transition-colors">
                                <Smartphone size={15} /> Phone OTP
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[--border-warm] text-sm text-[--text-secondary] hover:bg-white/60 transition-colors">
                                <KeyRound size={15} /> Google
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-[--text-secondary] mt-6">
                    By continuing, you agree to our <a href="#" className="text-[--terracotta] hover:underline">Terms</a> and <a href="#" className="text-[--terracotta] hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
