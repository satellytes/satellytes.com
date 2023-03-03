import { AuroraHero } from '../../content/heroes';
import React from 'react';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Career } from './career';
import { Service } from './service';
import { Blog } from './blog';
import {
  BlogPostTeaser,
  ContentfulCustomerLogo,
  SyPersonioJob,
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
  positions: SyPersonioJob[];
  posts: BlogPostTeaser[];
  officeImages: OfficeImages;
  customerLogos: ContentfulCustomerLogo[];
}

export const Landingpage = ({
  positions,
  posts,
  officeImages,
  customerLogos,
}: LandingpageProps) => {
  const { t } = useTranslation();

  return (
    <Layout
      transparentHeader={true}
      light={true}
      hero={
        <AuroraHero title={'Satellytes'}>{t('main.description')}</AuroraHero>
      }
    >
      <ContentBlockContainer>
        <Service />
      </ContentBlockContainer>

      <Customers logos={customerLogos} />

      <ContentBlockContainer>
        <Career positions={positions} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-02.jpg']} />

      <ContentBlockContainer>
        <Blog posts={posts} />
      </ContentBlockContainer>
    </Layout>
  );
};
