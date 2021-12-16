import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { up } from '../../components/support/breakpoint';
import { Image } from '../../components/image/image';
import { SectionHeader } from '../../components/section-header/section-header';
import { SyTeamMember } from '../../types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TeamLayout = styled.div`
  margin-top: 80px;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 40px 8px;

  ${up('sm')} {
    gap: 40px 24px;
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
        headline={t('about-us.team.heading')}
        kicker={t('about-us.team.title')}
      >
        {t('about-us.team.text')}
      </SectionHeader>

      <TeamLayout>
        {team.map((member) => {
          return (
            <Image description={member.name} textAlign="bottom" key={member.id}>
              {member.image && (
                <GatsbyImage alt="" image={getImage(member.image)!} />
              )}
            </Image>
          );
        })}
      </TeamLayout>
    </div>
  );
};
