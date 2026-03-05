import { useState, useRef } from 'react';

const sampleImages = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
];

export default function ProductShowcase() {
    const [images, setImages] = useState<string[]>(sampleImages);
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [arMode, setArMode] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function onMouseDown(e: React.MouseEvent) {
        setIsDragging(true);
        setStartX(e.clientX);
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        setRotation(r => r + diff * 0.5);
        setStartX(e.clientX);
    }

    function onMouseUp() { setIsDragging(false); }

    function handleUpload() {
        // Simulate adding images from a gallery
        const extras = [
            'https://images.unsplash.com/photo-1631445851533-5e2cf3ba3db7?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=500&fit=crop',
        ];
        setImages(prev => [...prev, ...extras.filter(i => !prev.includes(i))]);
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">360° Product Showcase</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Upload multiple images to create an interactive product viewer with AR preview</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Viewer */}
                <div className="bg-white rounded-2xl p-6 border border-[--border-warm]">
                    <h3 className="font-semibold text-[--text-primary] mb-4">Interactive Viewer</h3>
                    <div
                        ref={containerRef}
                        className={`relative rounded-2xl overflow-hidden aspect-square cursor-grab select-none ${isDragging ? 'cursor-grabbing' : ''}`}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(244,160,38,0.1), rgba(196,98,45,0.05))' }}
                    >
                        <img
                            src={images[current]}
                            alt="Product"
                            className="w-full h-full object-cover transition-transform duration-100"
                            style={{ transform: `rotateY(${rotation % 360}deg) scale(${isDragging ? 1.02 : 1})` }}
                            draggable={false}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="glass px-4 py-2 rounded-xl text-sm text-[--text-primary] font-medium shadow">
                                ← Drag to rotate →
                            </div>
                        </div>
                        <div className="absolute top-3 left-3 glass px-2 py-1 rounded-lg text-xs font-medium">
                            {current + 1} / {images.length}
                        </div>
                        {arMode && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                                <div className="text-center text-white">
                                    <div className="text-5xl mb-3 animate-pulse">📱</div>
                                    <div className="font-semibold">AR Preview Active</div>
                                    <div className="text-sm opacity-80 mt-1">Point camera at a flat surface</div>
                                    <button onClick={() => setArMode(false)} className="mt-4 px-4 py-2 bg-white/20 rounded-xl text-sm hover:bg-white/30 transition-colors">
                                        Exit AR
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                        {images.map((img, i) => (
                            <button key={i} onClick={() => setCurrent(i)}
                                className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${current === i ? 'border-[--terracotta] shadow-md' : 'border-transparent hover:border-[--border-warm]'}`}>
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => { setRotation(r => r - 30); setTimeout(() => setRotation(r => r + 30), 300); }}
                            className="flex-1 py-2 rounded-xl border border-[--border-warm] text-sm text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] transition-all"
                        >
                            ↺ Rotate
                        </button>
                        <button
                            onClick={() => setArMode(true)}
                            className="flex-1 py-2 rounded-xl text-white text-sm font-medium transition-all"
                            style={{ background: 'linear-gradient(135deg, #3D52A0, #7091E6)' }}
                        >
                            📱 AR Preview
                        </button>
                        <button onClick={handleUpload} className="flex-1 py-2 rounded-xl border border-[--border-warm] text-sm text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] transition-all">
                            📷 Add Photos
                        </button>
                    </div>
                </div>

                {/* Upload + Story */}
                <div className="space-y-4">
                    {/* Upload zone */}
                    <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[--border-warm] hover:border-[--terracotta] transition-colors text-center cursor-pointer group" onClick={handleUpload}>
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📷</div>
                        <h3 className="font-semibold text-[--text-primary]">Upload Product Photos</h3>
                        <p className="text-sm text-[--text-secondary] mt-1">Drag & drop or click to upload. Best: 3–6 angles of your product</p>
                        <button className="mt-4 px-5 py-2 rounded-xl text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                            Choose Photos
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <h3 className="font-semibold text-[--text-primary] mb-3">📸 Photo Tips</h3>
                        <ul className="space-y-2.5">
                            {[
                                { icon: '☀️', tip: 'Use natural daylight — avoid flash' },
                                { icon: '🔄', tip: 'Capture front, back, side, and detail shots' },
                                { icon: '🖐️', tip: 'Include a hand for scale reference' },
                                { icon: '⚪', tip: 'Use a clean white or neutral background' },
                                { icon: '🔍', tip: 'Show craft details and textures up close' },
                            ].map(({ icon, tip }) => (
                                <li key={tip} className="flex items-start gap-2 text-sm text-[--text-secondary]">
                                    <span>{icon}</span> {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Enhancement */}
                    <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <h3 className="font-semibold text-[--text-primary] mb-3">✨ AI Photo Enhancement</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Remove background', desc: 'Auto white background for marketplaces' },
                                { label: 'Enhance colors', desc: 'Bring out natural craft colors' },
                                { label: 'Add watermark', desc: 'Brand protection for your craft' },
                            ].map(({ label, desc }) => (
                                <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-[--warm-white] border border-[--border-warm]">
                                    <div>
                                        <div className="text-sm font-medium text-[--text-primary]">{label}</div>
                                        <div className="text-xs text-[--text-secondary]">{desc}</div>
                                    </div>
                                    <button className="text-xs px-3 py-1.5 rounded-lg text-white font-medium" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>Apply</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
