import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enIN from './locales/en-IN.json';
import hi from './locales/hi.json';
import enUS from './locales/en-US.json';
import ur from './locales/ur.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';

const resources = {
  en:      { translation: enIN },
  hi:      { translation: hi },
  'en-US': { translation: enUS },
  ur:      { translation: ur },
  zh:      { translation: zh },
  fr:      { translation: fr },
  pt:      { translation: pt },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'selectedLanguage',
      caches: ['localStorage'],
    },
  });

export default i18n;
