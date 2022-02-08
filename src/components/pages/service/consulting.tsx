import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { DashedListItem, Intro, UnorderedList } from './support';

export const Consulting = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="scientist_042"
        headline={t('services.consulting.title')}
      >
        <p>{t('services.consulting.text')}</p>
      </Intro>

      <UnorderedList>
        <DashedListItem>
          {t('services.consulting.list.workshops')}
        </DashedListItem>
        <DashedListItem>
          {t('services.consulting.list.techanalysis')}
        </DashedListItem>
        <DashedListItem>
          {t('services.consulting.list.uxanalysis')}
        </DashedListItem>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
