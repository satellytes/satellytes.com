import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/seo';
import { OfficePage } from '../page-building/office/office-page';
import { SyPersonioJob, SyTeamMember } from '../types';

interface OfficeProps {
  location: Location;
  data: {
    allTeamJson: {
      nodes: SyTeamMember[];
    };
  };
}

const Office = (props: OfficeProps) => {
  const { t } = useTranslation();
  console.log(props.data.allTeamJson);
  return (
    <>
      <SEO
        title={`${t('office.title')} | Satellytes`}
        location={props.location}
      />
      <OfficePage team={props.data.allTeamJson.nodes} />
    </>
  );
};

export default Office;

export const OfficePageQuery = graphql`
  query ($language: String!) {
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
