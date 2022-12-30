import React, { ReactNode } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { down, up } from '../../support/breakpoint';
import { Image } from '../../ui/image/image';
import { SectionHeader } from '../../content/section-header/section-header';
import { SyAboutImage, SyTeamMember } from '../../../types';
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  StaticImage,
} from 'gatsby-plugin-image';
import { JSXElement } from '@babel/types';

interface TeamLayoutProps {
  imgCount: number;
}

const columnCount = 32;

const TeamLayout = styled.div`
  display: grid;
  overflow: hidden;
  object-fit: cover;
  // atomical tile height: 250px,
  grid-template-rows: repeat(${columnCount}, 250px);
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
    'p10 p11'
    'p10 p12'
    'p13 p12'
    'p14 p14'
    'p14 p14'
    'p15 p15'
    'p15 p15'
    'p16 p17'
    'p16 p17'
    'p18 p19'
    'p18 p20'
    'p21 p20'
    'p22 p22'
    'p22 p22'
    'p23 p23'
    'p23 p23'
    'p24 p25'
    'p24 p25'
    'p26 p27'
    'p26 p28'
    'p29 p29'
    'p29 p29'
    'p30 p31'
    'p30 p31';

  ${down('sm')} {
    grid-template-rows: auto;
    grid-template-columns: 100%;
    grid-auto-flow: row;
  }
`;

interface TeamProps {
  team: SyTeamMember[];
}

interface GalleryItemProps {
  index: number;
  children?: ReactNode;
}

const GalleryImage = styled(GatsbyImage)`
  min-width: 100%;
  min-height: 100%;
`;

const GalleryItem = ({ index, children }: GalleryItemProps) => (
  <div style={{ gridArea: 'p' + index, overflow: 'hidden' }}>{children}</div>
);

export const Team = ({ team }: TeamProps) => {
  const { t } = useTranslation();
  let index = 1;

  return (
    <TeamLayout>
      {team.map((member) => {
        const imageData = getImage(member.image);
        return (
          <GalleryItem index={index++} key={member.id}>
            {imageData && <GalleryImage alt="" image={imageData} />}
            {/* <StaticImage
            src="../../../assets/images/office/2.png"
            alt="placeholder"
            style={{minWidth: "100%", minHeight: "100%"}}
          /> */}
          </GalleryItem>
        );
      })}
    </TeamLayout>
  );
};
