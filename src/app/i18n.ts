import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        fallbackLng: 'fr',
        debug: import.meta.env.DEV,
        initImmediate: false,
        backend: {
            loadPath: "/i18n/{{lng}}/{{ns}}.json"
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage']
        }
    })

export default i18n
