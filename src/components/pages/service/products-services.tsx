import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { DashedListItem, Intro, UnorderedList } from './support';

export const ProductsServices = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="book_038"
        headline={t('services.products_services.title')}
      >
        <p>{t('services.products_services.text')}</p>
      </Intro>

      <UnorderedList>
        <DashedListItem>
          {t('services.products_services.list.prototyping')}
        </DashedListItem>
        <DashedListItem>
          {t('services.products_services.list.ideation')}
        </DashedListItem>
        <DashedListItem>
          {t('services.products_services.list.development')}
        </DashedListItem>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
