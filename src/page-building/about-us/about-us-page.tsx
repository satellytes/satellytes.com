import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { Office } from './office';
import { Team } from './team';
import { SyTeamMember } from '../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageHero } from '../../new-components/heroes';

interface AboutUsPageProps {
  team: SyTeamMember[];
  heroImageData: IGatsbyImageData;
}

export const AboutUsPage = (props: AboutUsPageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: t('about-us.leadbox.title'),
    link: {
      title: t('about-us.leadbox.link'),
      href: '/career',
    },
  };

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<ImageHero image={props.heroImageData} />}
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={t('about-us.office.heading')}
          kicker={t('about-us.office.title')}
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
