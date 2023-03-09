import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../../layout/layout';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Team } from './team';
import { ContentfulAboutUsImpression, SyTeamMember } from '../../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageHero } from '../../content/heroes';
import { Impressions } from './impressions';

interface AboutUsPageProps {
  team: SyTeamMember[];
  heroImageData: IGatsbyImageData;
  impressions: ContentfulAboutUsImpression[];
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
          title={t<string>('about-us.title')}
          image={props.heroImageData}
        >
          {' '}
          {t('about-us.description')}{' '}
        </ImageHero>
      }
    >
      <ContentBlockContainer>
        <Impressions impressions={props.impressions} />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Team team={props.team} />
      </ContentBlockContainer>
    </Layout>
  );
};
