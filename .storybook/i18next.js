import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const DEFAULT_LANGUAGE = 'en';
const AVAILABLE_LANGUAGES = [DEFAULT_LANGUAGE, 'de'];

// Ideally match the given gatsby i18n config
i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: AVAILABLE_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

// Everything is ready, now load our translations
AVAILABLE_LANGUAGES.forEach((lang) => {
  i18n.addResourceBundle(
    lang,
    'translation',
    require(`./src/assets/locales/${lang}/translations.json`),
  );
});
export { i18n };
