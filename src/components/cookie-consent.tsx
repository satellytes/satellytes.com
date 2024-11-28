import React, { useEffect } from 'react';
import '@orestbida/iframemanager/dist/iframemanager.css';
import '@orestbida/iframemanager/dist/iframemanager.js';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsentLib from 'vanilla-cookieconsent';
import enCookieConsentTranslations from '../assets/locales/en/cookie-consent-translations.json';
import deCookieConsentTranslations from '../assets/locales/de/cookie-consent-translations.json';
import { useTranslation } from 'react-i18next';
import LeadinfoScript from './layout/leadinfo-script';
import { LanguageSwitch } from './layout/header/language-switch';
import ReactDOM from 'react-dom';
import { styled } from 'styled-components';

// fix style that get broken by the cookieconsent css
const StyledLanguageSwitch = styled(LanguageSwitch)`
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  select {
    text-align: left;
    padding-left: 0;
  }
`;

export const CookieConsent = () => {
  const { t, i18n } = useTranslation();
  const [showLanguageSwitch, setShowLanguageSwitch] = React.useState(false);
  // @ts-expect-error - iframemanager is defined at runtime
  const im = typeof iframemanager !== 'undefined' ? iframemanager() : null;

  // Code partially from https://cookieconsent.orestbida.com/advanced/iframemanager-setup.html
  const iframeManagerOnChange = ({ changedServices, eventSource }) => {
    if (eventSource.type === 'click') {
      const servicesToAccept = [
        ...CookieConsentLib.getUserPreferences().acceptedServices['analytics'],
        ...changedServices,
      ];

      CookieConsentLib.acceptService(servicesToAccept, 'analytics');
    }
  };

  const setupIframeManager = () => {
    im.reset();
    im.run({
      currLang: i18n.language,
      onChange: iframeManagerOnChange,
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
              notice: t('iframemanager.youtube.notice'),
              loadBtn: t('iframemanager.youtube.load-button'),
              loadAllBtn: t('iframemanager.youtube.load-all-button'),
            },
          },
        },
      },
    });
  };

  const setupCookieConsent = () => {
    CookieConsentLib.reset();
    CookieConsentLib.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
        social: {
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
      onModalShow: () => {
        setShowLanguageSwitch(true); // wait for the modal to be rendered so the container for the language switch is available
      },
    }).then();
  };

  useEffect(() => {
    if (!im) return;
    setupIframeManager();
    setupCookieConsent();
  }, [i18n.language]);

  return (
    <>
      <LeadinfoScript />
      {showLanguageSwitch &&
        ReactDOM.createPortal(
          <StyledLanguageSwitch
            translation={undefined}
            className="cookie-consent-modal-language-switch-componet"
          />,
          document.getElementById('cookie-consent-modal-language-switch')!,
        )}
    </>
  );
};
