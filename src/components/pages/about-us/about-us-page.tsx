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
  sectionHeaderImpressions: ContentfulSectionHeader;
  sectionHeaderTeam: ContentfulSectionHeader;
  leadbox: LeadboxProps;
}

export const AboutUsPage = ({
  title,
  description,
  team,
  heroImageData,
  impressions,
  sectionHeaderImpressions,
  sectionHeaderTeam,
  leadbox,
}: AboutUsPageProps) => {
  return (
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={
        <ImageHero hideMobileText title={title} image={heroImageData}>
          {' '}
          {description}{' '}
        </ImageHero>
      }
    >
      <ContentBlockContainer>
        <Impressions
          impressions={impressions}
          description={description}
          sectionHeader={sectionHeaderImpressions}
        />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Team team={team} sectionHeader={sectionHeaderTeam} />
      </ContentBlockContainer>
    </Layout>
  );
};
