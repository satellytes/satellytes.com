import { AuroraHero } from '../../content/heroes';
import React from 'react';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Career } from './career';
import { Service } from './service';
import { Blog } from './blog';
import {
  BlogPostTeaser,
  ContentfulSectionHeader,
  ContentfulTeaserItem,
  ContentfulVacancy,
} from '../../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageSpacer } from '../../ui/image/image-spacer';
import { Customers } from './customers';

interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

type OfficeImages = { [relativePath: string]: OfficeImage };

interface LandingpageProps {
  title: string;
  description: string;
  positions: ContentfulVacancy[];
  posts: BlogPostTeaser[];
  officeImages: OfficeImages;
  serviceHeader: ContentfulSectionHeader;
  careerHeader: ContentfulSectionHeader;
  serviceTeaser: ContentfulTeaserItem[];
  blogHeader: ContentfulSectionHeader;
}

export const Landingpage = ({
  title,
  description,
  positions,
  posts,
  officeImages,
  serviceHeader,
  serviceTeaser,
  careerHeader,
  blogHeader,
}: LandingpageProps) => {
  return (
    <Layout
      transparentHeader={true}
      light={true}
      hero={<AuroraHero title={title}>{description}</AuroraHero>}
    >
      <ContentBlockContainer>
        <Service header={serviceHeader} teaser={serviceTeaser} />
      </ContentBlockContainer>

      <Customers />

      <ContentBlockContainer>
        <Career positions={positions} header={careerHeader} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-07.jpg']} />

      <ContentBlockContainer>
        <Blog posts={posts} header={blogHeader} />
      </ContentBlockContainer>
    </Layout>
  );
};
