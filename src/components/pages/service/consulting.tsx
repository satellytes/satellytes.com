import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro, UnorderedList } from './support';

export const Consulting = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="consulting_054"
        headline={t('services.consulting.title')}
        kicker={t('services.consulting.kicker')}
      >
        <p>{t('services.consulting.text')}</p>
      </Intro>

      <UnorderedList>
        <li>{t('services.consulting.1.list')}</li>
        <li>{t('services.consulting.2.list')}</li>
        <li>{t('services.consulting.3.list')}</li>
        <li>{t('services.consulting.4.list')}</li>
        <li>{t('services.consulting.5.list')}</li>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
