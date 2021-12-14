import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/seo';
import { OfficePage } from '../page-building/office/office-page';
import { SyTeamMember } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface OfficeProps {
  location: Location;
  data: {
    hero: IGatsbyImageData;
    allTeamJson: {
      nodes: SyTeamMember[];
    };
  };
}

const Office = (props: OfficeProps) => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={`${t('office.title')} | Satellytes`}
        location={props.location}
      />
      <OfficePage
        heroImageData={props.data.hero}
        team={props.data.allTeamJson.nodes}
      />
    </>
  );
};

export default Office;

export const OfficePageQuery = graphql`
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
