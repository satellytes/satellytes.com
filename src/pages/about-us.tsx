import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../new-components/layout/seo';
import { AboutUsPage } from '../page-building/about-us/about-us-page';
import { SyTeamMember } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutUsProps {
  location: Location;
  data: {
    hero: IGatsbyImageData;
    allTeamJson: {
      nodes: SyTeamMember[];
    };
  };
}

const AboutUs = (props: AboutUsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={`${t('about-us.title')} | Satellytes`}
        location={props.location}
      />
      <AboutUsPage
        heroImageData={props.data.hero}
        team={props.data.allTeamJson.nodes}
      />
    </>
  );
};

export default AboutUs;
export const AboutUsPageQuery = graphql`
  query ($language: String!) {
    hero: file(relativePath: { eq: "office/sy-office-02.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    allTeamJson {
      nodes {
        id
        name
        image {
          childImageSharp {
            gatsbyImageData(
              width: 400
              aspectRatio: 1
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
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
