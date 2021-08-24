import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['nb'];
const availableLanguages = ['en', 'nb'];

/* const resources = {
  en: {
    translation: translationEN
  },
  nb: {
    translation: translationNO
  }
}; */

i18n
  .use(Backend)
  .use(LanguageDetector)

  .use(initReactI18next)
  .init({
    fallbackLng,
    ignoreJSONStructure: false,
    debug: true,
    defaultNS: 'common',
    whitelist: availableLanguages,
    keySeparator: '.',
    lng: 'nb',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
