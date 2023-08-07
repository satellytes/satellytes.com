import React from 'react';
import { Layout } from '../../layout/layout';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Team } from './team';
import {
  ContentfulAboutUsImpression,
  ContentfulSectionHeader,
  SyTeamMember,
} from '../../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageHero } from '../../content/heroes';
import { Impressions } from './impressions';

interface AboutUsPageProps {
  title: string;
  description: string;
  team: SyTeamMember[];
  heroImageData: IGatsbyImageData;
  impressions: ContentfulAboutUsImpression[];
  sectionHeader: ContentfulSectionHeader;
  leadboxHeader: ContentfulSectionHeader;
}

export const AboutUsPage = (props: AboutUsPageProps) => {
  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: props.leadboxHeader.headline as string,
    link: {
      title: props.leadboxHeader.kicker as string,
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
          hideMobileText
          title={props.title}
          image={props.heroImageData}
        >
          {' '}
          {props.description}{' '}
        </ImageHero>
      }
    >
      <ContentBlockContainer>
        <Impressions
          impressions={props.impressions}
          description={props.description}
          sectionHeader={props.sectionHeader}
        />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Team team={props.team} />
      </ContentBlockContainer>
    </Layout>
  );
};
