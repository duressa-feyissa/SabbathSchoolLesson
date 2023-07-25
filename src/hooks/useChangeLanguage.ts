import { useLangQueryStore } from '../store';


const useChangeLanguage = ()  => {
  const setLanguageQuery = useLangQueryStore((state) => state.setLanguageQuery);

  const setLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    setLanguageQuery(lang);
  };

  return setLanguage;
};

export default useChangeLanguage;

