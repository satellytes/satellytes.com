import React, { useEffect, useState } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import LeadinfoScript from '../components/layout/leadinfo-script';
import { useTranslation } from 'react-i18next';
import { getCookieConsentLocale } from '../components/i18n-helpers';

const CookieConsentComponentV3 = () => {
  const { t, i18n } = useTranslation();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

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
      onFirstConsent: (param) => {
        handleConsent(param.cookie.categories);
      },
    });
  }, [t]);

  const handleConsent = (categories) => {
    const isAnalyticsAccepted = categories.includes('analytics');

    if (isAnalyticsAccepted) {
      setAnalyticsEnabled(true);
      setLeadinfoCookies();
    } else {
      setAnalyticsEnabled(false);
      clearLeadinfoCookies();
    }
  };

  const setLeadinfoCookies = () => {
    const twoYears = 63072000;
    const sessionValue = new Date().toISOString();
    document.cookie = `_li_id=some_value; max-age=${twoYears}; path=/`;
    document.cookie = `_li_ses=${sessionValue}; max-age=0; path=/`;
  };

  const clearLeadinfoCookies = () => {
    document.cookie = '_li_id=; max-age=0; path=/';
    document.cookie = '_li_ses=; max-age=0; path=/';
  };

  return <LeadinfoScript enable={analyticsEnabled} />;
};

export default CookieConsentComponentV3;
