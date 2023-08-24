import React from 'react';
import { Teaser } from '../../content/teaser/teaser';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { ContentfulVacancy } from '../../../types';
import { up } from '../../support/breakpoint';
import { CareerTeaserGrid } from './career-teaser-grid';
import { textEllipsis } from '../../support/text-ellipsis';

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
  headline: string;
}

export const Openings = ({ jobs, headline }: OpeningsProps) => {
  return (
    <div>
      <SectionHeadline>{headline}</SectionHeadline>
      <OpeningsTeaseGrid>
        {jobs.map((item) => (
          <Teaser
            preventStretching
            title={item.name}
            linkTo={item.slug}
            key={item.id}
          >
            {textEllipsis(item.shortDescription.shortDescription, 200)}
          </Teaser>
        ))}
      </OpeningsTeaseGrid>
    </div>
  );
};
