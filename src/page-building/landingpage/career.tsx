import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../components/teasers/teaser-grid';
import { Teaser } from '../../components/teasers/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { SyPersonioJob } from '../../types';

interface CareerProps {
  positions: SyPersonioJob[];
}

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
    </>
  );
};
