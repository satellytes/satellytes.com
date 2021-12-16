import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { SyPersonioJob } from '../../../types';
import styled from 'styled-components';
import { Button } from '../../ui/buttons/button';

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
      <Button to={'/career'}>Alle offenen Stellen</Button>
    </>
  );
};
