import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { down } from '../../support/breakpoint';
import { GalleryItem } from '../../../types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// the number of vertical tiles
const rowCount = 38;

const TeamLayout = styled.div`
  display: grid;
  overflow: hidden;
  object-fit: cover;
  // atomical tile height: 250px,
  grid-template-rows: repeat(${rowCount}, 250px);
  grid-template-columns: repeat(2, calc(50% - 12px));
  align-items: stretch;
  justify-items: stretch;
  gap: 24px;
  grid-auto-flow: row;
  // combine multiple smaller tiles into bigger ones
  // each line represents one row, each word ('pN') represents one column
  grid-template-areas:
    'p1 p1'
    'p1 p1'
    'p2 p3'
    'p2 p4'
    'p5 p4'
    'p6 p6'
    'p6 p6'
    'p7 p8'
    'p9 p8'
    'p10 p10'
    'p10 p10'
    'p11 p12'
    'p11 p13'
    'p14 p13'
    'p15 p15'
    'p15 p15'
    'p16 p16'
    'p16 p16'
    'p17 p18'
    'p17 p18'
    'p19 p19'
    'p19 p19'
    'p20 p21'
    'p20 p22'
    'p23 p22'
    'p24 p25'
    'p24 p25'
    'p26 p26'
    'p26 p26'
    'p27 p27'
    'p27 p27'
    'p28 p29'
    'p28 p29'
    'p30 p31'
    'p30 p32'
    'p33 p33'
    'p33 p33'
    'p34 p35'
    'p34 p35';

  ${down('sm')} {
    grid-template-areas: unset;
    grid-template-rows: auto;
    grid-template-columns: 100%;
    grid-auto-flow: row;
  }
`;

interface TeamProps {
  team: GalleryItem[];
}

interface GalleryTileProps {
  index: number;
  children?: ReactNode;
}

const GalleryImage = styled(GatsbyImage)`
  min-width: 100%;
  min-height: 100%;
`;

const GalleryTile = styled.div<GalleryTileProps>`
  grid-area: ${({ index }) => 'p' + index};
  overflow: hidden;
  ${down('sm')} {
    grid-area: unset;
  }
`;

export const Team = ({ team }: TeamProps) => {
  let index = 1;

  return (
    <TeamLayout>
      {team.map((member) => {
        const imageData = getImage(member.image);
        return (
          <GalleryTile index={index++} key={member.id}>
            {imageData && <GalleryImage alt="" image={imageData} />}
          </GalleryTile>
        );
      })}
    </TeamLayout>
  );
};
