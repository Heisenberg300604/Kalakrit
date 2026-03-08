import { useState, useRef, useEffect } from 'react';
import {
    Mic, Square, Loader2, CheckCircle2, RotateCcw, Rocket,
    Globe, FileText, Tag, Layers, Sparkles, IndianRupee,
    AlertCircle, CircleDot, Pencil
} from 'lucide-react';
import { generateListing, generateStory, type GeneratedListing } from '../../services/gemini';
import { useAuth } from '../../hooks/AuthContext';
import supabase from '../../utils/supabase';

type Step = 'idle' | 'recording' | 'processing' | 'done';

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
    error: string;
    message: string;
}

const LANG_MAP: Record<string, { code: string; label: string; native: string; speechCode: string }> = {
    hi: { code: 'hi', label: 'Hindi', native: 'हिन्दी', speechCode: 'hi-IN' },
    ta: { code: 'ta', label: 'Tamil', native: 'தமிழ்', speechCode: 'ta-IN' },
    te: { code: 'te', label: 'Telugu', native: 'తెలుగు', speechCode: 'te-IN' },
    bn: { code: 'bn', label: 'Bengali', native: 'বাংলা', speechCode: 'bn-IN' },
    en: { code: 'en', label: 'English', native: 'English', speechCode: 'en-IN' },
};

export default function VoiceListing() {
    const { user } = useAuth();
    const [step, setStep] = useState<Step>('idle');
    const [selectedLang, setSelectedLang] = useState('hi');
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [result, setResult] = useState<GeneratedListing | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editPrice, setEditPrice] = useState(0);
    const [published, setPublished] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);
    const [saving, setSaving] = useState(false);

    const recognitionRef = useRef<any>(null);
    const transcriptRef = useRef('');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const stepRef = useRef<Step>('idle');
    const hasFinalizedRef = useRef(false);

    useEffect(() => {
        stepRef.current = step;
    }, [step]);

    async function finalizeRecording() {
        if (hasFinalizedRef.current) return;
        hasFinalizedRef.current = true;

        const finalText = transcriptRef.current || transcript || interimTranscript;

        if (!finalText.trim()) {
            setError('No speech detected. Please try speaking again.');
            setStep('idle');
            return;
        }

        setTranscript(finalText.trim());
        setStep('processing');

        try {
            const listing = await generateListing(finalText.trim(), LANG_MAP[selectedLang].label);
            setResult(listing);
            setEditTitle(listing.title);
            setEditDesc(listing.description);
            setEditPrice(listing.suggestedPrice);
            setStep('done');
        } catch (err: any) {
            setError(err.message || 'Failed to generate listing. Please try again.');
            setStep('idle');
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch { /* ignore */ }
            }
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    function startRecording() {
        setError('');
        setTranscript('');
        setInterimTranscript('');
        transcriptRef.current = '';
        hasFinalizedRef.current = false;

        // Ensure secure context (required by some browsers for speech APIs)
        const isSecureContext =
            window.location.protocol === 'https:' || window.location.hostname === 'localhost';

        if (!isSecureContext) {
            setError('Voice input requires a secure (https) connection. Please use https or localhost.');
            return;
        }

        // Check browser support
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = LANG_MAP[selectedLang].speechCode;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    transcriptRef.current += result[0].transcript + ' ';
                    setTranscript(transcriptRef.current.trim());
                } else {
                    interim += result[0].transcript;
                }
            }
            setInterimTranscript(interim);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone access in browser settings.');
                setStep('idle');
            } else if (event.error === 'network') {
                setError('Speech service is temporarily unavailable. Check your internet connection and try again.');
                setStep('idle');
            } else if (event.error === 'no-speech') {
                setError('No speech detected. Please try speaking again.');
                setStep('idle');
            } else if (event.error !== 'aborted') {
                setError(`Speech recognition error: ${event.error}`);
                setStep('idle');
            }

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            setInterimTranscript('');
        };

        recognition.onend = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (stepRef.current === 'recording' || stepRef.current === 'processing') {
                void finalizeRecording();
            }
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch {
            setError('Could not start microphone. Please try again.');
            setStep('idle');
            return;
        }

        setStep('recording');
        setTimer(0);
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }

    async function stopRecording() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setInterimTranscript('');
        setStep('processing');

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch {
                await finalizeRecording();
            }
        } else {
            await finalizeRecording();
        }
    }

    async function handlePublish() {
        if (!result || !user) return;
        setSaving(true);
        setError('');

        try {
            // 1. Save the product
            const { data: insertedProduct, error: dbError } = await supabase.from('products').insert({
                user_id: user.id,
                title: editTitle,
                description: editDesc,
                category: result.category,
                tags: result.tags,
                materials: result.materials,
                highlights: result.highlights,
                suggested_price: editPrice,
                transcript: transcript,
                language: selectedLang,
                status: 'published',
            }).select('id').single();

            if (dbError) {
                throw new Error(dbError.message);
            }

            // 2. Generate AI story in the background (non-blocking)
            if (insertedProduct?.id) {
                generateStory({
                    title: editTitle,
                    description: editDesc,
                    category: result.category,
                    materials: result.materials,
                }).then(story => {
                    supabase.from('products').update({
                        story_title: story.storyTitle,
                        craft_heritage: story.craftHeritage,
                        how_its_made: story.howItsMade,
                        why_unique: story.whyUnique,
                        artisan_narrative: story.artisanNarrative,
                    }).eq('id', insertedProduct.id).then(() => {
                        console.log('AI story generated and saved!');
                    });
                }).catch(err => {
                    console.warn('Story generation failed (non-critical):', err);
                });
            }

            setPublished(true);
        } catch (err: any) {
            setError(err.message || 'Failed to save product. Please try again.');
        } finally {
            setSaving(false);
        }
    }

    function resetAll() {
        hasFinalizedRef.current = false;
        setStep('idle');
        setTranscript('');
        setInterimTranscript('');
        setResult(null);
        setEditTitle('');
        setEditDesc('');
        setEditPrice(0);
        setPublished(false);
        setError('');
        setTimer(0);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">Voice-to-Listing</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Speak in your language — AI creates your product listing instantly</p>
            </div>

            {/* Error display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
                    <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                    <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 text-xs font-medium">Dismiss</button>
                </div>
            )}

            {/* Published success */}
            {published && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                    <CheckCircle2 size={40} className="mx-auto text-green-500 mb-2" />
                    <h3 className="font-semibold text-green-800 text-lg">Product Saved Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">Your listing is now live on the marketplace!</p>
                    <button onClick={resetAll} className="mt-4 px-6 py-2 rounded-xl text-white text-sm font-semibold inline-flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                        <Mic size={16} /> Add Another Product
                    </button>
                </div>
            )}

            {!published && (
                <>
                    {/* Language selector */}
                    <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                        <div className="flex items-center gap-2 mb-3">
                            <Globe size={16} className="text-[--terracotta]" />
                            <p className="text-sm font-medium text-[--text-primary]">Select your speaking language</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(LANG_MAP).map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setSelectedLang(lang.code)}
                                    disabled={step !== 'idle'}
                                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selectedLang === lang.code
                                        ? 'border-[--terracotta] text-white'
                                        : 'border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta]/50'
                                        } ${step !== 'idle' ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    style={selectedLang === lang.code ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}
                                >
                                    {lang.native}
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
                                onClick={step === 'idle' ? startRecording : step === 'recording' ? stopRecording : undefined}
                                disabled={step === 'processing'}
                                className={`voice-button ${step === 'recording' ? 'recording' : ''} ${step === 'processing' ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {step === 'processing' ? (
                                    <Loader2 size={40} className="animate-spin text-white" />
                                ) : step === 'recording' ? (
                                    <Square size={32} className="text-white" />
                                ) : (
                                    <Mic size={40} className="text-white" />
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
                                <div className="text-2xl font-bold text-red-500 mb-2">
                                    {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                                </div>
                                <h3 className="font-semibold text-xl text-red-500">Recording... Speak Clearly</h3>
                                <p className="text-[--text-secondary] text-sm mt-2">Tap the button to stop recording</p>
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
                                    {['Analyzing speech', 'Generating title', 'Writing description', 'Suggesting price'].map((s, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <Loader2 size={18} className="animate-spin text-[--terracotta]" />
                                            <span className="hidden sm:block">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Live transcript */}
                    {(transcript || interimTranscript) && step === 'recording' && (
                        <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={14} className="text-[--terracotta]" />
                                <p className="text-xs font-medium text-[--text-secondary] uppercase tracking-wide">Live Transcription</p>
                                <CircleDot size={10} className="text-red-500 animate-pulse" />
                            </div>
                            <p className="text-[--text-primary] font-medium">
                                {transcript}
                                {interimTranscript && <span className="text-[--text-secondary]/60 italic"> {interimTranscript}</span>}
                            </p>
                        </div>
                    )}

                    {/* Final transcript */}
                    {transcript && step !== 'recording' && (
                        <div className="bg-white rounded-2xl p-5 border border-[--border-warm]">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={14} className="text-[--terracotta]" />
                                <p className="text-xs font-medium text-[--text-secondary] uppercase tracking-wide">Transcribed Text</p>
                            </div>
                            <p className="text-[--text-primary] font-medium">{transcript}</p>
                        </div>
                    )}

                    {/* Generated Listing */}
                    {result && step === 'done' && (
                        <div className="bg-white rounded-2xl p-6 border border-[--border-warm] space-y-5">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={18} className="text-green-500" />
                                <h2 className="font-semibold text-[--text-primary]">AI Generated Listing</h2>
                                <span className="ml-auto text-xs badge-green px-2 py-1 rounded-full">Ready to Save</span>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <Pencil size={12} /> Product Title
                                </label>
                                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[--border-warm] text-[--text-primary] font-medium focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all" />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <Pencil size={12} /> Description
                                </label>
                                <textarea rows={4} value={editDesc} onChange={e => setEditDesc(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[--border-warm] text-[--text-primary] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all resize-none" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                        <Layers size={12} /> Category
                                    </label>
                                    <div className="px-4 py-2.5 rounded-xl bg-[--warm-white] border border-[--border-warm] text-[--text-primary] text-sm">{result.category}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                        <IndianRupee size={12} /> Suggested Price
                                    </label>
                                    <input type="number" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[--border-warm] text-[--text-primary] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <Tag size={12} /> Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {result.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs badge-indigo">{tag}</span>)}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <Layers size={12} /> Materials
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {result.materials.map(m => <span key={m} className="px-3 py-1 rounded-full text-xs badge-saffron">{m}</span>)}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                    <Sparkles size={12} /> Product Highlights
                                </label>
                                <ul className="space-y-1.5">
                                    {result.highlights.map(h => (
                                        <li key={h} className="flex items-start gap-2 text-sm text-[--text-secondary]">
                                            <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button onClick={resetAll} className="flex-1 py-3 rounded-xl border border-[--border-warm] text-[--text-secondary] text-sm font-semibold hover:bg-[--warm-white] transition-all inline-flex items-center justify-center gap-2">
                                    <RotateCcw size={15} /> Re-record
                                </button>
                                <button
                                    onClick={handlePublish}
                                    disabled={saving}
                                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold shadow hover:shadow-lg transition-all disabled:opacity-70 inline-flex items-center justify-center gap-2"
                                    style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}
                                >
                                    {saving ? (
                                        <><Loader2 size={15} className="animate-spin" /> Saving...</>
                                    ) : (
                                        <><Rocket size={15} /> Save Product</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
