import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'he' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('dh-language') as Language;
    if (savedLanguage && ['he', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
      updateDocumentAttributes(savedLanguage);
    } else {
      setLanguageState('en');
      updateDocumentAttributes('en');
    }
  }, []);

  const updateDocumentAttributes = (lang: Language) => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
  };

  const setLanguage = (newLanguage: Language) => {
    console.log('Changing language to:', newLanguage);
    setLanguageState(newLanguage);
    updateDocumentAttributes(newLanguage);
    localStorage.setItem('dh-language', newLanguage);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL: language === 'he',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
