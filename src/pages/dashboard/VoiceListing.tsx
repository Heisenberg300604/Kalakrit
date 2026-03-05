import { useState, useRef } from 'react';
import { mockVoiceListingResult } from '../../services/mockData';
import { formatCurrency } from '../../lib/utils';

type Step = 'idle' | 'recording' | 'processing' | 'done';

export default function VoiceListing() {
    const [step, setStep] = useState<Step>('idle');
    const [transcript, setTranscript] = useState('');
    const [result, setResult] = useState<typeof mockVoiceListingResult | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [published, setPublished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [timer, setTimer] = useState(0);

    function startRecording() {
        setStep('recording');
        setTimer(0);
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        // Simulate 4s recording then process
        setTimeout(() => stopRecording(), 4000);
    }

    function stopRecording() {
        if (timerRef.current) clearInterval(timerRef.current);
        setStep('processing');
        setTranscript('यह एक हाथ से बना वारली जनजातीय चित्र है। महाराष्ट्र के पालघर जिले से। प्राकृतिक सफेद रंगद्रव्य से बनाया गया।');
        setTimeout(() => {
            setResult(mockVoiceListingResult);
            setEditTitle(mockVoiceListingResult.title);
            setEditDesc(mockVoiceListingResult.description);
            setStep('done');
        }, 2500);
    }

    function handlePublish() {
        setPublished(true);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Voice-to-Listing</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Speak in your language — AI creates your product listing instantly</p>
            </div>

            {published && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="font-semibold text-green-800 text-lg">Product Published Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">Your listing is now live on Amazon and Etsy</p>
                    <button onClick={() => { setStep('idle'); setResult(null); setPublished(false); }} className="mt-4 px-6 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                        Add Another Product
                    </button>
                </div>
            )}

            {!published && (
                <>
                    {/* Language selector */}
                    <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <p className="text-sm font-medium text-[--text-primary] mb-3">Select your speaking language</p>
                        <div className="flex flex-wrap gap-2">
                            {[['Hindi', 'हिन्दी', '🇮🇳'], ['Tamil', 'தமிழ்', '🇮🇳'], ['Telugu', 'తెలుగు', '🇮🇳'], ['Bengali', 'বাংলা', '🇮🇳'], ['English', 'English', '🇬🇧']].map(([lang, native, flag]) => (
                                <button key={lang} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${lang === 'Hindi' ? 'border-[--terracotta] text-white' : 'border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta]/50'}`}
                                    style={lang === 'Hindi' ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}>
                                    {flag} {native}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Voice recorder */}
                    <div className="bg-white rounded-2xl p-8 border border-[--border-warm] text-center">
                        <div className="relative inline-flex items-center justify-center mb-6">
                            {step === 'recording' && (
                                <>
                                    <span className="absolute w-28 h-28 rounded-full opacity-30 animate-ping" style={{ background: 'rgba(196,98,45,0.4)' }}></span>
                                    <span className="absolute w-36 h-36 rounded-full opacity-20 animate-ping" style={{ background: 'rgba(196,98,45,0.2)', animationDelay: '0.3s' }}></span>
                                </>
                            )}
                            <button
                                onClick={step === 'idle' ? startRecording : stopRecording}
                                disabled={step === 'processing'}
                                className={`voice-button ${step === 'recording' ? 'recording' : ''} ${step === 'processing' ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {step === 'processing' ? (
                                    <svg className="animate-spin w-10 h-10 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                ) : (
                                    <span className="text-4xl text-white">{step === 'recording' ? '⏹️' : '🎙️'}</span>
                                )}
                            </button>
                        </div>

                        {step === 'idle' && (
                            <>
                                <h3 className="font-semibold text-xl text-[--text-primary] mb-2">Tap to Start Speaking</h3>
                                <p className="text-[--text-secondary] text-sm max-w-sm mx-auto">Describe your product in your language — what it is, how it's made, materials used. AI will create the full listing.</p>
                            </>
                        )}
                        {step === 'recording' && (
                            <>
                                <div className="text-2xl font-bold text-red-500 mb-2">{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</div>
                                <h3 className="font-semibold text-xl text-red-500">Recording... Speak Clearly</h3>
                                <p className="text-[--text-secondary] text-sm mt-2">Tap the button again to stop</p>
                                {/* Audio wave */}
                                <div className="flex items-center justify-center gap-1 mt-4">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="w-1 rounded-full bg-red-400 animate-pulse" style={{ height: `${Math.random() * 28 + 8}px`, animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                            </>
                        )}
                        {step === 'processing' && (
                            <>
                                <h3 className="font-semibold text-xl text-[--terracotta] mt-2">AI is creating your listing...</h3>
                                <p className="text-[--text-secondary] text-sm mt-2">Analyzing your description and generating professional content</p>
                                <div className="flex justify-center gap-4 mt-4 text-xs text-[--text-secondary]">
                                    {['Transcribing voice', 'Generating title', 'Writing description', 'Suggesting price'].map((s, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <div className="w-6 h-6 rounded-full border-2 border-[--terracotta] border-t-transparent animate-spin"></div>
                                            <span className="hidden sm:block">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Transcript */}
                    {(transcript || step === 'done') && (
                        <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                            <p className="text-xs font-medium text-[--text-secondary] uppercase tracking-wide mb-2">📝 Transcribed Text</p>
                            <p className="text-[--text-primary] font-medium">{transcript}</p>
                        </div>
                    )}

                    {/* Generated Listing */}
                    {result && (
                        <div className="bg-white rounded-2xl p-6 border border-[--border-warm] space-y-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-500 text-lg">✅</span>
                                <h2 className="font-semibold text-[--text-primary]">AI Generated Listing</h2>
                                <span className="ml-auto text-xs badge-green px-2 py-1 rounded-full">Ready to Publish</span>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Product Title</label>
                                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[--border-warm] text-[--text-primary] font-medium focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all" />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Description</label>
                                <textarea rows={4} value={editDesc} onChange={e => setEditDesc(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[--border-warm] text-[--text-primary] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all resize-none" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Category</label>
                                    <div className="px-4 py-2.5 rounded-xl bg-[--warm-white] border border-[--border-warm] text-[--text-primary] text-sm">{result.category}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Suggested Price</label>
                                    <div className="px-4 py-2.5 rounded-xl text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                        {formatCurrency(result.suggestedPrice)} <span className="font-normal text-white/80">/ piece</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {result.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs badge-indigo">{tag}</span>)}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Materials</label>
                                <div className="flex flex-wrap gap-2">
                                    {result.materials.map(m => <span key={m} className="px-3 py-1 rounded-full text-xs badge-saffron">{m}</span>)}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 block">Product Highlights</label>
                                <ul className="space-y-1.5">
                                    {result.highlights.map(h => (
                                        <li key={h} className="flex items-start gap-2 text-sm text-[--text-secondary]">
                                            <span className="text-green-500 mt-0.5">✓</span> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setStep('idle')} className="flex-1 py-3 rounded-xl border border-[--border-warm] text-[--text-secondary] text-sm font-semibold hover:bg-[--warm-white] transition-all">
                                    Re-record
                                </button>
                                <button onClick={handlePublish} className="flex-1 py-3 rounded-xl text-white text-sm font-semibold shadow hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                                    🚀 Publish to Marketplaces
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
