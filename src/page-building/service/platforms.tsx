import React from 'react';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro, UnorderedList } from './support';

export const Platforms = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro illustration="monitor_024" headline={t('services.platform.title')}>
        <p>{t('services.platform.text')}</p>
      </Intro>

      <UnorderedList>
        <li>{t('services.platform.list.platforms')}</li>
        <li>{t('services.platform.list.lowcode')}</li>
        <li>{t('services.platform.list.designsystems')}</li>
        <li>{t('services.platform.list.infrastructure')}</li>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
