import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerDetails } from '../components/pages/career-details/career-details';
import { SyPersonioJob } from '../types';

interface CareerPageProps {
  pageContext: {
    language: string;
    translation: string;
    overrideLanguages: string[];
    i18n: {
      originalPath: string;
    };
  };
  location: Location;
  data: {
    syPersonioJob: SyPersonioJob;
  };
}

const CareerPage: React.FC<CareerPageProps> = (props): JSX.Element => {
  const { pageContext } = props;
  const position = props.data.syPersonioJob;
  const socialCardPath = position.fields.socialCard.childImageSharp.fixed.src;
  const { t } = useTranslation();

  return (
    <>
      <SEO
        shareImagePath={socialCardPath}
        title={t('career.seo.title-detail', {
          name: position.name,
        })}
        description={t('career.seo.description-detail', {
          name: position.name,
        })}
        overrideLanguages={pageContext.overrideLanguages}
        location={props.location}
      />

      <CareerDetails
        originalPath={pageContext.i18n.originalPath}
        position={position}
        complementPath={pageContext.translation}
      />
    </>
  );
};

export const CareerDetailsPageQuery = graphql`
  query ($language: String!, $id: String!) {
    syPersonioJob(id: { eq: $id }) {
      fields {
        socialCard {
          childImageSharp {
            fixed(width: 1440, height: 760) {
              src
            }
          }
        }
      }
      id
      lang
      jobId
      name
      short
      createdAt
      slug
      sections {
        headline
        descriptionHtml
        description
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

export default CareerPage;
