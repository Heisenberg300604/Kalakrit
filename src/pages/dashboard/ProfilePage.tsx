import { useState } from 'react';
import { mockArtisan } from '../../services/mockData';
import { formatCurrency } from '../../lib/utils';

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(mockArtisan.name);
    const [bio, setBio] = useState(mockArtisan.bio);
    const [saved, setSaved] = useState(false);

    function handleSave() {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    const badges = ['GI Tagged Artisan', 'Verified Seller', 'Top Rated', '1+ Year Active'];

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">My Profile</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Manage your artisan identity and public profile</p>
            </div>

            {saved && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-center gap-2">
                    ✅ Profile updated successfully!
                </div>
            )}

            {/* Profile card */}
            <div className="bg-white rounded-2xl p-6 border border-[--border-warm]">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            {name.charAt(0)}
                        </div>
                        <button className="text-xs px-3 py-1.5 rounded-xl border border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] transition-all">
                            📷 Change Photo
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {editing ? (
                            <>
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] mb-1.5 block uppercase tracking-wide">Full Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[--border-warm] text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] mb-1.5 block uppercase tracking-wide">Bio</label>
                                    <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[--border-warm] text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all resize-none text-sm" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleSave} className="px-5 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>Save Changes</button>
                                    <button onClick={() => setEditing(false)} className="px-5 py-2 rounded-xl border border-[--border-warm] text-[--text-secondary] text-sm font-semibold hover:bg-[--warm-white] transition-all">Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="font-display text-xl font-bold text-[--text-primary]">{name}</h2>
                                        <p className="text-[--text-secondary] text-sm mt-0.5">{mockArtisan.craft} • {mockArtisan.location}</p>
                                    </div>
                                    <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-xl border border-[--border-warm] text-[--text-secondary] text-xs font-medium hover:border-[--terracotta] hover:text-[--terracotta] transition-all">
                                        ✏️ Edit
                                    </button>
                                </div>
                                <p className="text-sm text-[--text-secondary] leading-relaxed">{bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {badges.map(b => (
                                        <span key={b} className="text-xs px-3 py-1 rounded-full badge-saffron">{b}</span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Products', value: mockArtisan.totalProducts, icon: '🏺' },
                    { label: 'Orders', value: mockArtisan.totalSales, icon: '📦' },
                    { label: 'Revenue', value: formatCurrency(mockArtisan.totalRevenue), icon: '💰' },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-[--border-warm] text-center">
                        <div className="text-xl mb-1">{s.icon}</div>
                        <div className="font-bold text-lg text-[--text-primary]">{s.value}</div>
                        <div className="text-xs text-[--text-secondary]">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <h3 className="font-semibold text-[--text-primary] mb-4">Contact Information</h3>
                <div className="space-y-3">
                    {[
                        { label: 'Email', value: mockArtisan.email, icon: '✉️' },
                        { label: 'Phone', value: mockArtisan.phone, icon: '📱' },
                        { label: 'Language', value: mockArtisan.language.toUpperCase(), icon: '🌐' },
                        { label: 'Member since', value: new Date(mockArtisan.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }), icon: '📅' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-3 py-2 border-b border-[--border-warm] last:border-0">
                            <span>{item.icon}</span>
                            <span className="text-xs text-[--text-secondary] w-24">{item.label}</span>
                            <span className="text-sm text-[--text-primary] font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Craft Story */}
            <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[--text-primary]">My Craft Story</h3>
                    <button className="text-xs text-[--terracotta] font-medium hover:underline">✏️ Edit Story</button>
                </div>
                <p className="text-sm text-[--text-secondary] leading-relaxed italic">
                    "Third-generation silk weaver from Varanasi creating handloom sarees with traditional Banarasi patterns. My grandmother taught me this craft at age 8. Every thread I weave carries her memory and the hope that this art lives on."
                </p>
            </div>
        </div>
    );
}
