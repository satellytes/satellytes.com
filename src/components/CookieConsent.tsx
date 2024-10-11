import React, { useEffect, useState } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import LeadinfoScript from '../components/layout/leadinfo-script';

const CookieConsentComponentV3 = () => {
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
          en: {
            consentModal: {
              title: 'We use cookies',
              description:
                'This website uses cookies to ensure the best user experience.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences',
            },
            preferencesModal: {
              title: 'Manage Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close',
              sections: [
                {
                  title: 'Analytics Cookies',
                  description:
                    'We use analytics cookies to analyze website usage and improve our services.',
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
      onFirstConsent: (param) => {
        handleConsent(param.cookie.categories);
      },
    });
  }, []);

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
