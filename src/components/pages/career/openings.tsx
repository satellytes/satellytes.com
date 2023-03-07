import React from 'react';
import { Teaser } from '../../content/teaser/teaser';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { SyPersonioJob } from '../../../types';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { up } from '../../support/breakpoint';
import { CareerTeaserGrid } from './career-teaser-grid';

const SectionHeadline = styled.h2`
  ${TextStyles.headlineM}
  margin: 0;
  margin-bottom: 48px;

  ${up('md')} {
    ${TextStyles.headlineL}
    margin-bottom: 60px;
  }
`;

const OpeningsTeaseGrid = styled(CareerTeaserGrid)`
  margin-top: 48px;

  ${up('md')} {
    margin-top: 60px;
  }
`;

const CareerTeaser = styled(Teaser)`
  // Prevents the teaser from stretching across the whole width
  // if there is exactly one vacancy
  ${up('md')} {
    &:only-child {
      max-width: 50%;
    }
  }
`;

interface OpeningsProps {
  jobs: SyPersonioJob[];
}

export const Openings = (props: OpeningsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeadline>{t('career.openings.headline')}</SectionHeadline>
      <OpeningsTeaseGrid>
        {props.jobs.map((item) => (
          <CareerTeaser title={item.name} linkTo={item.slug} key={item.id}>
            {item.short}
          </CareerTeaser>
        ))}
      </OpeningsTeaseGrid>
    </div>
  );
};
