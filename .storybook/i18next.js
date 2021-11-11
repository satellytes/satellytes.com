import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const ns = ['translations'];
const supportedLngs = ['en', 'de'];

i18n.use(initReactI18next).init({
  languages: supportedLngs,
  defaultLanguage: 'en',
  silent: false,
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  supportedLngs,
  ns,
  nsSeparator: false,
});

supportedLngs.forEach((lang) => {
  i18n.addResourceBundle(
    lang,
    'translations',
    require(`../src/locales/${lang}/translations.json`),
  );
});
export { i18n };
