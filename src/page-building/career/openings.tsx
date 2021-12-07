import React from 'react';
import { Teaser } from '../../components/teasers/teaser';
import styled from 'styled-components';
import { up } from '../../components/breakpoint/breakpoint';
import { TextStyles } from '../../components/typography/typography-v2';
import { PersonioJobPosition } from '../../@types/personio';

const TeaserGrid = styled.div`
  display: grid;
  gap: 24px;

  justify-items: stretch;
  grid-template-columns: repeat(auto-fit, 250px);
  ${up('md')} {
    gap: 70px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SectionHeadline = styled.h2`
  ${TextStyles.headlineXL}
  margin: 0;
  margin-bottom: 80px;
`;

type PersonioJobPositionPartial = Pick<
  PersonioJobPosition,
  'name' | 'id' | 'satellytesPath' | 'satellytesShortDescription'
>;

interface OpeningsProps {
  jobs: PersonioJobPositionPartial[];
}

export const Openings = (props: OpeningsProps) => {
  return (
    <div>
      <SectionHeadline>Unsere offenen Stellen</SectionHeadline>

      <TeaserGrid>
        {props.jobs.map((item, index) => (
          <Teaser title={item.name} linkTo={item.satellytesPath} key={item.id}>
            <div
              dangerouslySetInnerHTML={{
                __html: item.satellytesShortDescription,
              }}
            />
          </Teaser>
        ))}
      </TeaserGrid>
    </div>
  );
};
