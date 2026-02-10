import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ko } from '../locales/ko';
import { en } from '../locales/en';
import { th } from '../locales/th';
import { vi } from '../locales/vi';
import { ja } from '../locales/ja';
import { zh } from '../locales/zh';
import { id } from '../locales/id';
import { mn } from '../locales/mn';

export type Language = 'ko' | 'en' | 'th' | 'vi' | 'ja' | 'zh' | 'id' | 'mn';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳' },
];

const translations = { ko, en, th, vi, ja, zh, id, mn } as const;
const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);

function isLanguage(value: string): value is Language {
  return LANGUAGE_CODES.includes(value as Language);
}

function detectBrowserLanguage(): Language {
  const browserCandidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ]
    .filter(Boolean)
    .map((lang) => lang.toLowerCase());

  for (const candidate of browserCandidates) {
    if (candidate.startsWith('ko')) return 'ko';
    if (candidate.startsWith('en')) return 'en';
    if (candidate.startsWith('th')) return 'th';
    if (candidate.startsWith('vi')) return 'vi';
    if (candidate.startsWith('ja')) return 'ja';
    if (candidate.startsWith('zh')) return 'zh';
    if (candidate.startsWith('id')) return 'id';
    if (candidate.startsWith('mn')) return 'mn';
  }

  return 'en';
}

function deepMerge(base: any, override: any): any {
  if (override === undefined || override === null) return base;
  if (typeof base !== 'object' || base === null) return override;
  if (typeof override !== 'object' || override === null) return override;
  if (Array.isArray(base) || Array.isArray(override)) return override;

  const output: Record<string, any> = { ...base };
  for (const key of Object.keys(override)) {
    output[key] = deepMerge(base[key], override[key]);
  }
  return output;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof ko;
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bbg-language');
    if (saved && isLanguage(saved)) {
      return saved;
    }
    return detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bbg-language', lang);
  };

  const currentLanguageOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const t = deepMerge(ko, translations[language]) as typeof ko;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t,
      currentLanguageOption 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
