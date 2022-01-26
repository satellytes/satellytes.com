import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import styled from 'styled-components';
import { Button } from '../../ui/buttons/button';

const Spacer = styled.div`
  height: 40px;
`;

export const Service = () => {
  const { t } = useTranslation();

  return (
    <>
      <HomePageHeaderBlock
        topline={t('main.services.kicker')}
        headline={t('main.services.title')}
        large={true}
      >
        {t('main.services.text')}
      </HomePageHeaderBlock>

      <TeaserGrid>
        <Teaser
          title={t('services.platform.title')}
          linkTo="/services"
          illustration="monitor_024"
        >
          {t('services.platform.teaser')}
        </Teaser>
        <Teaser
          title={t('services.products_services.title')}
          linkTo="/services"
          illustration="book_038"
        >
          {t('services.products_services.teaser')}
        </Teaser>
        <Teaser
          title={t('services.consulting.title')}
          linkTo="/services"
          illustration="scientist_042"
        >
          {t('services.consulting.teaser')}
        </Teaser>
      </TeaserGrid>

      <Spacer />
      <Button to={'/services'}>{t('main.services.button')}</Button>
    </>
  );
};
