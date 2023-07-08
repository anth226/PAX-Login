import useTranslation from 'next-translate/useTranslation';
import React, { useState, ReactNode, useMemo } from 'react';
import useLocalStorage from '../shared/hooks/useLocalStorage';
import setLanguage from 'next-translate/setLanguage';

export const LanguageContext = React.createContext({});

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const {lang} = useTranslation("common")
  const [language, setLocalLanguage] = useLocalStorage("language", lang)

  React.useEffect(()=>{
    setLanguage(language)
  },[language])

  return <LanguageContext.Provider value={{}}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
