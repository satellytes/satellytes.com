import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { DashedListItem, Intro, UnorderedList } from './support';

export const Platforms = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro illustration="monitor_024" headline={t('services.platform.title')}>
        <p>{t('services.platform.text')}</p>
      </Intro>

      <UnorderedList>
        <DashedListItem>{t('services.platform.list.platforms')}</DashedListItem>
        <DashedListItem>{t('services.platform.list.lowcode')}</DashedListItem>
        <DashedListItem>
          {t('services.platform.list.designsystems')}
        </DashedListItem>
        <DashedListItem>
          {t('services.platform.list.infrastructure')}
        </DashedListItem>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
