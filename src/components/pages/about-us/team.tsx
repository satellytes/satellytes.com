import React from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Image } from '../../ui/image/image';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentfulSectionHeader, SyTeamMember } from '../../../types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TeamLayout = styled.div`
  margin-top: 48px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: 40px 8px;

  ${up('sm')} {
    margin-top: 60px;

    gap: 40px 24px;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  }
`;

interface TeamProps {
  team: SyTeamMember[];
  sectionHeader: ContentfulSectionHeader;
}

export const Team = ({ team, sectionHeader }: TeamProps) => {
  return (
    <div>
      <SectionHeader
        headline={sectionHeader.headline as string}
        kicker={sectionHeader.kicker}
      >
        {sectionHeader.paragraphs?.[0]?.paragraph?.paragraph as string}
      </SectionHeader>

      <TeamLayout>
        {team.map((member) => {
          const imageData = getImage(member.image);
          return (
            <Image description={member.name} textAlign="bottom" key={member.id}>
              {imageData && <GatsbyImage alt="" image={imageData} />}
            </Image>
          );
        })}
      </TeamLayout>
    </div>
  );
};
