import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../../layout/layout';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Office } from './office';
import { Team } from './team';
import { SyTeamMember } from '../../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageHero } from '../../content/heroes';

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
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={
        <ImageHero
          kicker={t<string>('about-us.office.kicker')}
          title={t<string>('about-us.title')}
          image={props.heroImageData}
        />
      }
    >
      <ContentBlockContainer>
        <Team team={props.team} />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Office />
      </ContentBlockContainer>
    </Layout>
  );
};
