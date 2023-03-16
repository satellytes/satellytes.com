import React from 'react';
import { Teaser } from '../../content/teaser/teaser';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { ContentfulVacancy } from '../../../types';
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

interface OpeningsProps {
  jobs: ContentfulVacancy[];
}

export const Openings = (props: OpeningsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeadline>{t('career.openings.headline')}</SectionHeadline>
      <OpeningsTeaseGrid>
        {props.jobs.map((item) => (
          <Teaser
            preventStretching
            title={item.name}
            linkTo={item.slug}
            key={item.id}
          >
            {item.shortDescription.shortDescription}
          </Teaser>
        ))}
      </OpeningsTeaseGrid>
    </div>
  );
};
