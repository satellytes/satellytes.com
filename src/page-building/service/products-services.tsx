import React from 'react';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { ExpandableStyled, Intro, UnorderedList } from './support';

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
        <li>{t('services.products_services.list.prototyping')}</li>
        <li>{t('services.products_services.list.ideation')}</li>
        <li>{t('services.products_services.list.development')}</li>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
