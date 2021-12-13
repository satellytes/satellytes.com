import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../components/teasers/teaser-grid';
import { Teaser } from '../../components/teasers/teaser';
import {
  Illustration,
  IllustrationSize,
} from '../../components/illustration/illustration';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { LinkButton } from '../../components/links/links';
import styled from 'styled-components';

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
          cover={
            <Illustration show="monitor_024" size={IllustrationSize.MEDIUM} />
          }
        >
          {t('main.services.teasers.first.text')}
        </Teaser>
        <Teaser
          title={t('main.services.teasers.second.title')}
          linkTo="/services"
          cover={
            <Illustration show="scientist_042" size={IllustrationSize.MEDIUM} />
          }
        >
          {t('main.services.teasers.second.text')}
        </Teaser>
        <Teaser
          title={t('main.services.teasers.third.title')}
          linkTo="/services"
          cover={
            <Illustration show="book_038" size={IllustrationSize.MEDIUM} />
          }
        >
          {t('main.services.teasers.third.text')}
        </Teaser>
      </TeaserGrid>

      <Spacer />
      <LinkButton to={'/services'}>Learn more</LinkButton>
    </>
  );
};
