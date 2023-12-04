import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerDetails } from '../components/pages/career-details/career-details';
import { ContentfulVacancy } from '../types';
import { CareerDetailsStructuredData } from '../components/pages/career-details/career-details-structured-data';

interface CareerDetailsPageQueryProps {
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
    contentfulVacancy: ContentfulVacancy;
  };
}

const CareerPage = ({
  pageContext,
  data,
}: CareerDetailsPageQueryProps): JSX.Element => {
  const position = data.contentfulVacancy;

  return (
    <CareerDetails
      originalPath={pageContext.i18n.originalPath}
      position={position}
      complementPath={pageContext.translation}
    />
  );
};

export const Head = ({ location, data }: CareerDetailsPageQueryProps) => {
  const position = data.contentfulVacancy;
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
        location={location}
      />
      <CareerDetailsStructuredData position={position} />
    </>
  );
};

export const CareerDetailsPageQuery = graphql`
  query ($language: String!, $id: String!) {
    contentfulVacancy(id: { eq: $id }) {
      id
      name
      createdAt
      schedule
      shortDescription {
        shortDescription
      }
      content {
        raw
      }
      socialCardFile {
        childImageSharp {
          gatsbyImageData(width: 1440, height: 760)
        }
      }
      slug
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
