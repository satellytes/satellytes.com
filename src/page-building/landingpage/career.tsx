import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../new-components/teaser/teaser-grid';
import { Teaser } from '../../new-components/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { SyPersonioJob } from '../../types';
import { LinkButton } from '../../components/links/links';
import styled from 'styled-components';

interface CareerProps {
  positions: SyPersonioJob[];
}

const Spacer = styled.div`
  height: 40px;
`;
export const Career = ({ positions }: CareerProps) => {
  const { t } = useTranslation();

  return (
    <>
      <HomePageHeaderBlock
        topline={t('main.career.kicker')}
        headline={t('main.career.title')}
        large={true}
      >
        {t('main.career.text')}
      </HomePageHeaderBlock>

      <TeaserGrid>
        {positions.map((item) => (
          <Teaser key={item.id} title={item.name} linkTo={item.fields?.path}>
            {item.short}
          </Teaser>
        ))}
      </TeaserGrid>
      <Spacer />
      <LinkButton to={'/career'}>{t('main.career.button')}</LinkButton>
    </>
  );
};
