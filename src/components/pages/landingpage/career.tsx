import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { SyPersonioJob } from '../../../types';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';

interface CareerProps {
  positions: SyPersonioJob[];
}

const CareerTeaser = styled(Teaser)`
  // Prevents the teaser from stretching across the whole width
  // if there is exactly one vacancy
  ${up('md')} {
    &:only-child {
      max-width: 50%;
    }
  }
`;

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
          <CareerTeaser key={item.id} title={item.name} linkTo={item.slug}>
            {textEllipsis(item.short, 200)}
          </CareerTeaser>
        ))}
      </LandingPageTeaserGrid>
      <Button to={'/career'}>{t('main.career.button')}</Button>
    </>
  );
};
