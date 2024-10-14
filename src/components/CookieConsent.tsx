import React, { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import LeadinfoScript from '../components/layout/leadinfo-script';
import { useTranslation } from 'react-i18next';
import { getCookieConsentLocale } from '../components/i18n-helpers';

const CookieConsentComponentV3 = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    CookieConsent.run({
      categories: {
        analytics: {
          enabled: false,
        },
      },
      language: {
        default: 'en',
        translations: {
          en: getCookieConsentLocale(i18n.language),
          de: getCookieConsentLocale(i18n.language),
        },
      },
    });
  }, [t]);

  return <LeadinfoScript />;
};

export default CookieConsentComponentV3;
