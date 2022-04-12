import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerDetails } from '../components/pages/career-details/career-details';
import { SyPersonioJob } from '../types';
import { CareerDetailsStructuredData } from '../components/pages/career-details/career-details-structured-data';

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

const CareerPage = (props: CareerPageProps): JSX.Element => {
  const { pageContext } = props;
  const position = props.data.syPersonioJob;
  const socialCardPath =
    position.socialCardFile.childImageSharp.gatsbyImageData.images.fallback
      ?.src;
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

      <CareerDetailsStructuredData position={position} />

      <CareerDetails
        originalPath={pageContext.i18n.originalPath}
        position={position}
        complementPath={pageContext.translation}
      />
    </>
  );
};

export const CareerDetailsPageQuery = graphql`
  query ($id: String!, $language: String!) {
    syPersonioJob(id: { eq: $id }) {
      id
      lang
      jobId
      name
      short
      createdAt
      slug
      schedule
      sections {
        headline
        descriptionHtml
        description
      }
      socialCardFile {
        childImageSharp {
          gatsbyImageData(width: 1440, height: 760)
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

export default CareerPage;
