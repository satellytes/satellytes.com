import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { SyPersonioJob } from '../../../types';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';

interface CareerProps {
  positions: SyPersonioJob[];
}

const textEllipsis = (text, maxLength) => {
  const truncatedText = text.substring(0, maxLength);
  if (truncatedText.length < text.length) {
    return truncatedText + '...';
  }

  return truncatedText;
};

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

      <LandingPageTeaserGrid>
        {positions.map((item) => (
          <Teaser key={item.id} title={item.name} linkTo={item.slug}>
            {textEllipsis(item.short, 200)}
          </Teaser>
        ))}
      </LandingPageTeaserGrid>
      <Button to={'/career'}>{t('main.career.button')}</Button>
    </>
  );
};
