import { useState, useRef, useEffect } from 'react';
import { mockChatHistory, aiChatResponses } from '../../services/mockData';
import type { ChatMessage } from '../../types';

const quickQuestions = [
    { icon: '💰', label: 'Pricing advice', key: 'pricing' },
    { icon: '📣', label: 'Marketing tips', key: 'marketing' },
    { icon: '✏️', label: 'Product naming', key: 'naming' },
    { icon: '📖', label: 'Write my story', key: 'story' },
];

export default function AICommerceGuide() {
    const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(scrollToBottom, [messages, typing]);

    function getReply(text: string): string {
        const lower = text.toLowerCase();
        for (const [key, val] of Object.entries(aiChatResponses)) {
            if (lower.includes(key)) return val;
        }
        return `Great question! As your AI Commerce Guide, I'm here to help. Could you ask me something specific about pricing, marketing, product naming, or your craft story? I'll give you personalized advice based on current market trends. 🙏`;
    }

    async function send(text: string) {
        if (!text.trim()) return;
        const userMsg: ChatMessage = {
            id: String(Date.now()),
            role: 'user',
            content: text,
            timestamp: new Date().toISOString(),
        };
        setMessages(m => [...m, userMsg]);
        setInput('');
        setTyping(true);
        await new Promise(r => setTimeout(r, 1200));
        const reply: ChatMessage = {
            id: String(Date.now() + 1),
            role: 'assistant',
            content: getReply(text),
            timestamp: new Date().toISOString(),
        };
        setMessages(m => [...m, reply]);
        setTyping(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        send(input);
    }

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[--text-primary]">AI Commerce Guide</h1>
                <p className="text-[--text-secondary] text-sm mt-1">Your personal AI business mentor for pricing, marketing, and storytelling</p>
            </div>

            {/* Quick topics */}
            <div className="flex flex-wrap gap-2">
                {quickQuestions.map(q => (
                    <button key={q.key} onClick={() => send(q.key)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border border-[--border-warm] text-[--text-secondary] hover:border-[--terracotta] hover:text-[--terracotta] bg-white transition-all">
                        <span>{q.icon}</span> {q.label}
                    </button>
                ))}
            </div>

            {/* Chat area */}
            <div className="flex-1 bg-white rounded-2xl border border-[--border-warm] overflow-hidden flex flex-col">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[--border-warm]" style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.06), rgba(244,160,38,0.04))' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>🤖</div>
                    <div>
                        <div className="text-sm font-semibold text-[--text-primary]">KalaBot — AI Commerce Assistant</div>
                        <div className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block"></span>Online</div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)', color: 'white' }}>🤖</div>
                            )}
                            <div className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'text-white rounded-br-sm'
                                    : 'bg-[--warm-white] text-[--text-primary] border border-[--border-warm] rounded-bl-sm'
                                }`} style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #C4622D, #F4A026)' } : {}}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm bg-[--beige] font-semibold text-[--terracotta]">P</div>
                            )}
                        </div>
                    ))}
                    {typing && (
                        <div className="flex justify-start gap-2">
                            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)', color: 'white' }}>🤖</div>
                            <div className="bg-[--warm-white] border border-[--border-warm] rounded-2xl rounded-bl-sm px-4 py-3">
                                <div className="flex gap-1 items-center">
                                    {[0, 1, 2].map(i => (
                                        <span key={i} className="w-2 h-2 bg-[--terracotta-light] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-[--border-warm] flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask about pricing, marketing, product names, stories..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[--border-warm] text-sm text-[--text-primary] placeholder-[--text-secondary]/60 focus:outline-none focus:ring-2 focus:ring-[--terracotta]/30 transition-all bg-[--warm-white]"
                    />
                    <button type="submit" disabled={!input.trim() || typing}
                        className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-40 transition-all"
                        style={{ background: 'linear-gradient(135deg, #C4622D, #F4A026)' }}>
                        Send →
                    </button>
                </form>
            </div>
        </div>
    );
}
