import { useState } from 'react';
import { useLang } from '../../hooks/useLanguage';
import type { Language } from '../../types';

const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
];

export default function SettingsPage() {
    const { lang, setLang } = useLang();
    const [notifications, setNotifications] = useState({ orders: true, pricing: true, tips: false, updates: true });
    const [saved, setSaved] = useState(false);

    function handleSave() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    const sections = [
        {
            title: '🌐 Language & Region',
            content: (
                <div>
                    <p className="text-sm text-[--text-secondary] mb-3">Platform interface language</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {languages.map(l => (
                            <button key={l.code} onClick={() => setLang(l.code)}
                                className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all text-center ${lang === l.code ? 'text-white border-transparent shadow' : 'border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta]/50'}`}
                                style={lang === l.code ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}>
                                {l.native}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: '🔔 Notification Preferences',
            content: (
                <div className="space-y-3">
                    {[
                        { key: 'orders', label: 'New Order Alerts', desc: 'Get notified when you receive an order' },
                        { key: 'pricing', label: 'Pricing Suggestions', desc: 'AI price change recommendations' },
                        { key: 'tips', label: 'Craft Tips', desc: 'Weekly tips to improve your listings' },
                        { key: 'updates', label: 'Platform Updates', desc: 'New feature announcements' },
                    ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-[--warm-white] transition-colors">
                            <div>
                                <div className="text-sm font-medium text-[--text-primary]">{item.label}</div>
                                <div className="text-xs text-[--text-secondary]">{item.desc}</div>
                            </div>
                            <button
                                onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                                className={`relative w-11 h-6 rounded-full transition-all ${notifications[item.key as keyof typeof notifications] ? 'bg-[--terracotta]' : 'bg-gray-200'}`}
                            >
                                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notifications[item.key as keyof typeof notifications] ? 'left-5' : 'left-0.5'}`}></span>
                            </button>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: '🏪 Marketplace Defaults',
            content: (
                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-[--text-primary] mb-1.5 block">Default Currency</label>
                        <select className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-[--border-warm] text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all">
                            <option>INR — Indian Rupee</option>
                            <option>USD — US Dollar</option>
                            <option>GBP — British Pound</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-[--text-primary] mb-1.5 block">Shipping From</label>
                        <input type="text" defaultValue="Varanasi, Uttar Pradesh, India" className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-[--border-warm] text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all" />
                    </div>
                </div>
            ),
        },
        {
            title: '🔒 Privacy & Security',
            content: (
                <div className="space-y-3">
                    <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[--border-warm] text-[--text-secondary] text-sm font-medium hover:border-[--terracotta] hover:text-[--terracotta] transition-all text-left">
                        🔑 Change Password
                    </button>
                    <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[--border-warm] text-[--text-secondary] text-sm font-medium hover:border-[--terracotta] hover:text-[--terracotta] transition-all text-left ml-0 sm:ml-2">
                        📱 Two-Factor Authentication
                    </button>
                    <div className="pt-3 border-t border-[--border-warm]">
                        <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                            🗑️ Delete Account
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Settings</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Manage your account preferences and platform settings</p>
            </div>

            {saved && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-center gap-2">
                    ✅ Settings saved!
                </div>
            )}

            <div className="space-y-4">
                {sections.map(s => (
                    <div key={s.title} className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <h3 className="font-semibold text-[--text-primary] mb-4">{s.title}</h3>
                        {s.content}
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="px-8 py-3 rounded-xl text-white font-semibold shadow hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                    Save All Settings
                </button>
            </div>
        </div>
    );
}
