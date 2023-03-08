import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro, UnorderedList } from './support';

export const Platforms = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="digital_platform_056"
        headline={t('services.platform.title')}
        kicker={t('services.platform.kicker')}
      >
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
