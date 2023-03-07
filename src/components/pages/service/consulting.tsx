import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro, UnorderedList } from './support';

export const Consulting = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="scientist_042"
        headline={t('services.consulting.title')}
        kicker={t('services.consulting.kicker')}
      >
        <p>{t('services.consulting.text')}</p>
      </Intro>

      <UnorderedList>
        <li>{t('services.consulting.list.workshops')}</li>
        <li>{t('services.consulting.list.techanalysis')}</li>
        <li>{t('services.consulting.list.uxanalysis')}</li>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
