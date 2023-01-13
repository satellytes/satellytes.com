import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/layout/seo';
import { AboutUsPage } from '../components/pages/about-us/about-us-page';
import { GalleryItem } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutUsQueryProps {
  hero: IGatsbyImageData;
  allContentfulGalleryImage: {
    nodes: GalleryItem[];
  };
}

const AboutUs = (props: PageProps<AboutUsQueryProps>) => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={`${t('about-us.title')} | Satellytes`}
        location={props.location}
      />
      <AboutUsPage
        heroImageData={props.data.hero}
        images={props.data.allContentfulGalleryImage.nodes}
      />
    </>
  );
};

export default AboutUs;

export const AboutUsPageQuery = graphql`
  query ($language: String!) {
    hero: file(relativePath: { eq: "office/sy-office-05.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    allContentfulGalleryImage(
      filter: { node_locale: { eq: "en" } }
      sort: { index: ASC }
    ) {
      nodes {
        tileSize
        id
        image {
          gatsbyImageData(resizingBehavior: FILL, jpegProgressive: false)
        }
      }
    }

    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
