import React, { useEffect, useState } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import LeadinfoScript from '../components/layout/leadinfo-script';
import { useTranslation } from 'react-i18next';

const CookieConsentComponentV3 = () => {
  const { t } = useTranslation();
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
              title: t('consentModal.title'),
              description: t('consentModal.description'),
              acceptAllBtn: t('consentModal.acceptAllBtn'),
              acceptNecessaryBtn: t('consentModal.acceptNecessaryBtn'),
              showPreferencesBtn: t('consentModal.showPreferencesBtn'),
            },
            preferencesModal: {
              title: t('preferencesModal.title'),
              acceptAllBtn: t('preferencesModal.acceptAllBtn'),
              acceptNecessaryBtn: t('preferencesModal.acceptNecessaryBtn'),
              savePreferencesBtn: t('preferencesModal.savePreferencesBtn'),
              closeIconLabel: t('preferencesModal.closeIconLabel'),
              sections: [
                {
                  title: t('preferencesModal.sections.necessary.title'),
                  description: t(
                    'preferencesModal.sections.necessary.description',
                  ),
                  linkedCategory: 'necessary',
                },
                {
                  title: t('preferencesModal.sections.analytics.title'),
                  description: t(
                    'preferencesModal.sections.analytics.description',
                  ),
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
