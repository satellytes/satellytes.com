import React from 'react';
import '@orestbida/iframemanager/dist/iframeManager.css';
import '@orestbida/iframemanager/dist/iframemanager.js';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsentLib from 'vanilla-cookieconsent';
import enCookieConsentTranslations from '../assets/locales/en/cookie-consent-translations.json';
import deCookieConsentTranslations from '../assets/locales/de/cookie-consent-translations.json';
import { useTranslation } from 'react-i18next';

export const CookieConsent = () => {
  const { t, i18n } = useTranslation();
  // @ts-expect-error - iframemanager is defined at runtime
  const im = iframemanager();

  React.useEffect(() => {
    im.run({
      currLang: i18n.language,
      onChange: ({ changedServices, eventSource }) => {
        if (eventSource.type === 'click') {
          const servicesToAccept = [
            ...CookieConsentLib.getUserPreferences().acceptedServices[
              'analytics'
            ],
            ...changedServices,
          ];

          CookieConsentLib.acceptService(servicesToAccept, 'analytics');
        }
      },

      services: {
        youtube: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
          thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
          iframe: {
            allow:
              'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
          },
          languages: {
            en: {
              notice: t('iframemanager.youtube.notice'),
              loadBtn: t('iframemanager.youtube.load-button'),
              loadAllBtn: t('iframemanager.youtube.load-all-button'),
            },
            de: {
              notice:
                'Dieser Inhalt wird von einer externen Quelle gehostet. Durch das Laden des Inhalts akzeptieren Sie die <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">Nutzungsbedingungen</a> von youtube.com.',
              loadBtn: 'Video laden',
              loadAllBtn: 'Video laden und nicht mehr fragen',
            },
          },
        },
      },
    });
  }, [i18n.language]);

  React.useEffect(() => {
    CookieConsentLib.run({
      categories: {
        analytics: {
          services: {
            youtube: {
              label: 'YouTube Embeds',
              onAccept: () => im.acceptService('youtube'),
              onReject: () => im.rejectService('youtube'),
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
