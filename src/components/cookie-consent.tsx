import React from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsentLib from 'vanilla-cookieconsent';
import enCookieConsentTranslations from '../assets/locales/en/cookie-consent-translations.json';
import deCookieConsentTranslations from '../assets/locales/de/cookie-consent-translations.json';
import { useTranslation } from 'react-i18next';

export const CookieConsent = () => {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    CookieConsentLib.run({
      categories: {
        analytics: {
          services: {
            youtube: {
              label: 'YouTube Embeds',
              onAccept: () => console.log('youtube accepted'),
              onReject: () => console.log('youtube rejected'),
            },
          },
        },
      },
      language: {
        default: i18n.language,
        translations: {
          en: enCookieConsentTranslations,
          de: deCookieConsentTranslations,
        },
      },
    }).then();
  }, [i18n.language]);

  return null;
};
