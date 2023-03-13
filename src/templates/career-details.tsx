import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerDetails } from '../components/pages/career-details/career-details';
import { ContentfulVacancy, SyPersonioJob } from '../types';
import { CareerDetailsStructuredData } from '../components/pages/career-details/career-details-structured-data';
import { ContentfulRichText } from '../components/content/rich-text/rich-text';

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
    contentfulVacancy: ContentfulVacancy;
  };
}

const CareerPage = (props: CareerPageProps): JSX.Element => {
  const { pageContext } = props;
  const position = props.data.contentfulVacancy;
  // const socialCardPath =
  //   position.socialCardFile.childImageSharp.gatsbyImageData.images.fallback
  //     ?.src;
  const { t } = useTranslation();

  return (
    <>
      <SEO
        // todo add social card
        // shareImagePath={socialCardPath}
        title={t('career.seo.title-detail', {
          name: position.name,
        })}
        description={t<string>('career.seo.description-detail', {
          name: position.name,
        })}
        location={props.location}
      />

      {/*todo add structured data*/}
      {/*<CareerDetailsStructuredData position={position} />*/}

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

    contentfulVacancy(id: { eq: $id }) {
      id
      name
      shortDescription {
        shortDescription
      }
      content {
        raw
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
