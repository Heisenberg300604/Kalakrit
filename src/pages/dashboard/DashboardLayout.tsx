import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    LayoutDashboard, Mic, Package, ShoppingBag, TrendingUp, Globe,
    Rotate3D, Bot, BarChart2, User, Settings, LogOut, Bell, Menu, X, Search,
} from 'lucide-react';
import { useLang } from '../../hooks/useLanguage';
import { mockArtisan } from '../../services/mockData';
import type { Language } from '../../types';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { path: '/dashboard/voice', label: 'Voice Assistant', icon: Mic },
    { path: '/dashboard/products', label: 'My Products', icon: Package },
    { path: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/dashboard/pricing', label: 'Pricing Insights', icon: TrendingUp },
    { path: '/dashboard/marketplace', label: 'Marketplace Export', icon: Globe },
    { path: '/dashboard/showcase', label: '360° Showcase', icon: Rotate3D },
    { path: '/dashboard/guide', label: 'AI Guide', icon: Bot },
    { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
];

const bottomItems = [
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'ta', label: 'TA' },
    { code: 'te', label: 'TE' },
    { code: 'bn', label: 'BN' },
];

export default function DashboardLayout() {
    const location = useLocation();
    const { lang, setLang } = useLang();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path: string, end?: boolean) => {
        if (end) return location.pathname === path;
        return location.pathname.startsWith(path) && path !== '/dashboard';
    };

    return (
        <div className="flex h-screen bg-[--warm-white] overflow-hidden">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-[--border-warm] shadow-xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[--border-warm]">
                    <svg viewBox="0 0 36 36" className="w-7 h-7 flex-shrink-0" fill="none">
                        <ellipse cx="18" cy="24" rx="10" ry="7" fill="#C4622D" opacity="0.15" />
                        <path d="M18 4 C10 4 8 12 10 18 L18 32 L26 18 C28 12 26 4 18 4Z" fill="#C4622D" />
                        <path d="M14 14 Q18 10 22 14" stroke="#F4A026" strokeWidth="1.5" fill="none" />
                    </svg>
                    <span className="font-display text-lg font-bold text-[--terracotta]">KalaKrit</span>
                    <button className="ml-auto lg:hidden text-[--text-secondary] hover:text-[--text-primary] p-1" onClick={() => setSidebarOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                {/* Artisan badge */}
                <div className="px-4 py-3 mx-3 my-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.07), rgba(244,160,38,0.05))' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold text-white" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            {mockArtisan.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[--text-primary] truncate">{mockArtisan.name}</div>
                            <div className="text-xs text-[--text-secondary] truncate">{mockArtisan.craft}</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
                    {navItems.map((item) => {
                        const active = isActive(item.path, item.end);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'text-white shadow-sm' : 'text-[--text-secondary] hover:bg-[--beige] hover:text-[--terracotta]'
                                    }`}
                                style={active ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}
                            >
                                <Icon size={16} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom nav */}
                <div className="px-3 py-3 border-t border-[--border-warm] space-y-0.5">
                    {bottomItems.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'text-[--terracotta] bg-[--beige]' : 'text-[--text-secondary] hover:bg-[--beige] hover:text-[--terracotta]'}`}
                            >
                                <Icon size={16} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                    <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[--text-secondary] hover:bg-red-50 hover:text-red-500 transition-all">
                        <LogOut size={16} />
                        <span>Exit Dashboard</span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top bar */}
                <header className="flex items-center gap-4 px-4 sm:px-6 py-3 bg-white border-b border-[--border-warm] shadow-sm">
                    <button
                        className="lg:hidden p-2 rounded-lg text-[--text-secondary] hover:bg-[--beige] transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={18} />
                    </button>

                    <div className="flex-1">
                        <div className="relative max-w-xs">
                            <Search size={14} className="absolute left-3 top-3 text-[--text-secondary]/50" />
                            <input type="text" placeholder="Search products, orders..." className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[--border-warm] bg-[--warm-white] text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/20 transition-all" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Lang switcher */}
                        <div className="hidden sm:flex items-center gap-1 border border-[--border-warm] rounded-xl p-1">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${lang === l.code ? 'text-white' : 'text-[--text-secondary] hover:text-[--terracotta]'}`}
                                    style={lang === l.code ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>

                        <button className="relative p-2 rounded-xl text-[--text-secondary] hover:bg-[--beige] transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[--terracotta] rounded-full border border-white"></span>
                        </button>

                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            V
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
