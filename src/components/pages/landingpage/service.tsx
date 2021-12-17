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
          title={t('main.services.teasers.first.title')}
          linkTo="/services"
          illustration="monitor_024"
        >
          {t('main.services.teasers.first.text')}
        </Teaser>
        <Teaser
          title={t('main.services.teasers.second.title')}
          linkTo="/services"
          illustration="scientist_042"
        >
          {t('main.services.teasers.second.text')}
        </Teaser>
        <Teaser
          title={t('main.services.teasers.third.title')}
          linkTo="/services"
          illustration="book_038"
        >
          {t('main.services.teasers.third.text')}
        </Teaser>
      </TeaserGrid>

      <Spacer />
      <Button to={'/services'}>{t('main.services.button')}</Button>
    </>
  );
};
