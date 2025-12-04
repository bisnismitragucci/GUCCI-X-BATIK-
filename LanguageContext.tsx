
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TRANSLATIONS } from './constants';

type Language = 'ID' | 'EN' | 'IT' | 'FR' | 'JP' | 'CN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['ID'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ID');

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS['ID']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
