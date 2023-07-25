import React, { createContext, useEffect, useState } from "react";

interface LanguageContextType {
  language: string | null;
  setLanguage: (lang: string) => void;
  getLanguage: () => string | null;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: null,
  setLanguage: () => null,
  getLanguage: () => null,
});

interface Props {
  children: React.ReactNode;
}

const LanguageProvider = ({ children }: Props) => {
  const storedLanguage = localStorage.getItem("lang");
  const defaultLanguage = "am";
  const [language, setLanguageState] = useState<string | null>(
    storedLanguage || defaultLanguage
  );

  const setLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    setLanguageState(lang);
  };

  const getLanguage = () => {
    return localStorage.getItem("lang") || defaultLanguage;
  };

  useEffect(() => {
    if (!storedLanguage) {
      setLanguage(defaultLanguage);
    } else {
      setLanguageState(storedLanguage);
    }
  }, [storedLanguage]);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    getLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
