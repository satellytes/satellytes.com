import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Image } from '../../ui/image/image';
import { SectionHeader } from '../../content/section-header/section-header';
import { SyTeamMember } from '../../../types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TeamLayout = styled.div`
  margin-top: 48px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px 8px;

  ${up('sm')} {
    margin-top: 60px;

    gap: 40px 24px;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  }
`;

interface TeamProps {
  team: SyTeamMember[];
}

export const Team = ({ team }: TeamProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        headline={t<string>('about-us.team.heading')}
        kicker={t<string>('about-us.team.title')}
      >
        {t('about-us.team.text')}
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
