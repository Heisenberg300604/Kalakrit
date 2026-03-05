import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../types';

const translations: Record<string, Record<Language, string>> = {
    'Start Selling': { en: 'Start Selling', hi: 'बेचना शुरू करें', ta: 'விற்க தொடங்குங்கள்', te: 'అమ్మకం ప్రారంభించండి', bn: 'বিক্রয় শুরু করুন' },
    'Dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', ta: 'டாஷ்போர்டு', te: 'డాష్‌బోర్డ్', bn: 'ড্যাশবোর্ড' },
    'My Products': { en: 'My Products', hi: 'मेरे उत्पाद', ta: 'என் தயாரிப்புகள்', te: 'నా ఉత్పత్తులు', bn: 'আমার পণ্য' },
    'Add Product': { en: 'Add Product', hi: 'उत्पाद जोड़ें', ta: 'பொருள் சேர்க்க', te: 'ఉత్పత్తి జోడించండి', bn: 'পণ্য যোগ করুন' },
    'Voice Assistant': { en: 'Voice Assistant', hi: 'वॉइस असिस्टेंट', ta: 'குரல் உதவியாளர்', te: 'వాయిస్ అసిస్టెంట్', bn: 'ভয়েস সহকারী' },
    'Orders': { en: 'Orders', hi: 'ऑर्डर', ta: 'ஆர்டர்கள்', te: 'ఆర్డర్లు', bn: 'অর্ডার' },
    'Analytics': { en: 'Analytics', hi: 'विश्लेषण', ta: 'பகுப்பாய்வு', te: 'విశ్లేషణ', bn: 'বিশ্লেষণ' },
    'Settings': { en: 'Settings', hi: 'सेटिंग्स', ta: 'அமைப்புகள்', te: 'సెట్టింగులు', bn: 'সেটিংস' },
    'Profile': { en: 'Profile', hi: 'प्रोफाइल', ta: 'சுயவிவரம்', te: 'ప్రొఫైల్', bn: 'প্রোফাইল' },
    'Total Sales': { en: 'Total Sales', hi: 'कुल बिक्री', ta: 'மொத்த விற்பனை', te: 'మొత్తం అమ్మకాలు', bn: 'মোট বিক্রয়' },
    'Total Products': { en: 'Total Products', hi: 'कुल उत्पाद', ta: 'மொத்த தயாரிப்புகள்', te: 'మొత్తం ఉత్పత్తులు', bn: 'মোট পণ্য' },
};

interface LangContextType {
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
    lang: 'en',
    setLang: () => { },
    t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('en');
    const t = (key: string) => translations[key]?.[lang] ?? key;
    return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
