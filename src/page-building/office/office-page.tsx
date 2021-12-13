import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { up } from '../../components/style-utils/breakpoint';

import { LayoutV2 } from '../../components/layout/layout-v2';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { Office } from './office';
import { Team } from './team';

import HeroImage from './../../images/office/sy-office-01.jpg';
import { SyTeamMember } from '../../types';

const Hero = styled.div`
  height: 520px;

  ${up('md')} {
    height: 640px;
  }

  background-image: url(${HeroImage});
  background-position: center;
  background-size: cover;
`;

interface OfficePageProps {
  team: SyTeamMember[];
}

export const OfficePage = (props: OfficePageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: t('office.leadbox.title'),
    link: {
      title: t('office.leadbox.link'),
      href: '/career',
    },
  };

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<Hero />}
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={t('office.heading')}
          kicker={t('office.title')}
        >
          Feel at home with us. A small impression of our office in Sendlinger
          Straße in the heart of Munich.
        </SectionHeader>
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Office />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Team team={props.team} />
      </ContentBlockContainer>
    </LayoutV2>
  );
};
