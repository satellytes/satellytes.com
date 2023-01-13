import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { down } from '../../support/breakpoint';
import { GalleryItem, TileSize } from '../../../types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TeamLayout = styled.div`
  display: grid;
  overflow: hidden;
  object-fit: cover;
  // atomic tile height: 250px,
  grid-template-rows: repeat(auto-fill, 250px);
  grid-template-columns: repeat(2, calc(50% - 12px));
  align-items: stretch;
  justify-items: stretch;
  gap: 24px;
  grid-auto-flow: row;

  ${down('sm')} {
    grid-template-rows: auto;
    grid-template-columns: 100%;
    grid-auto-flow: row;
  }
`;

interface TeamProps {
  team: GalleryItem[];
}

interface GalleryTileProps {
  tileSize: TileSize;
  index: number;
  children?: ReactNode;
}

const GalleryImage = styled(GatsbyImage)`
  min-width: 100%;
  min-height: 100%;
`;

function getSpan(tileSize?: TileSize) {
  let value = 'span 2 / span 2';
  if (tileSize && tileSize === '1x1') {
    value = 'span 1 / span 1';
  } else if (tileSize && tileSize === '2x1') {
    value = 'span 2 / span 1';
  }
  return value;
}

const GalleryTile = styled.div<GalleryTileProps>`
  //grid-area: ${({ index }) => (index >= 0 ? 'p' + index : 'auto')};
  grid-area: ${({ tileSize }) => getSpan(tileSize)};
  overflow: hidden;
  ${down('sm')} {
    grid-area: unset;
  }
`;

export const Team = ({ team }: TeamProps) => {
  let index = 1;
  const imageCount = team.length;

  return (
    <TeamLayout>
      {team.map((member) => {
        const imageData = getImage(member.image);
        return (
          <GalleryTile
            index={index <= imageCount ? index++ : -1}
            tileSize={member.tileSize}
            key={member.id}
          >
            {imageData && <GalleryImage alt="" image={imageData} />}
          </GalleryTile>
        );
      })}
    </TeamLayout>
  );
};
