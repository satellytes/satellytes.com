import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro, UnorderedList } from './support';

export const ProductsServices = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="software_057"
        headline={t('services.products_services.title')}
        kicker={t('services.products_services.kicker')}
      >
        <p>{t('services.products_services.text')}</p>
      </Intro>

      <UnorderedList>
        <li>{t('services.products_services.1.list')}</li>
        <li>{t('services.products_services.2.list')}</li>
        <li>{t('services.products_services.3.list')}</li>
        <li>{t('services.products_services.4.list')}</li>
        <li>{t('services.products_services.5.list')}</li>
      </UnorderedList>
    </ContentBlockContainer>
  );
};
