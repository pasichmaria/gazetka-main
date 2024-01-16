import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next'
import translationEn from './locales/en.json'
import translationUa from './locales/ua.json'
const resources = {
  en: {
    translation: translationEn
  },
  ua: {
    translation: translationUa
  }
}

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  })
export default i18next
