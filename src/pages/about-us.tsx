import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/layout/seo';
import { AboutUsPage } from '../components/pages/about-us/about-us-page';
import { ContentfulAboutUsImpression, SyTeamMember } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutUsQueryProps {
  hero: IGatsbyImageData;
  allContentfulTeamMember: {
    nodes: SyTeamMember[];
  };
  allContentfulAboutUsImpressions: {
    nodes: ContentfulAboutUsImpression[];
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
        impressions={props.data.allContentfulAboutUsImpressions.nodes}
        team={props.data.allContentfulTeamMember.nodes}
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

    allContentfulTeamMember(filter: { node_locale: { eq: "en" } }) {
      nodes {
        id
        name
        image {
          gatsbyImageData(
            width: 400
            aspectRatio: 1
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            cropFocus: FACE
            resizingBehavior: FILL
            jpegProgressive: false
          )
        }
      }
    }

    allContentfulAboutUsImpressions(
      filter: { node_locale: { eq: "en" } }
      sort: { name: ASC }
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
