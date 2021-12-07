import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LeadboxProps } from '../new-components/leadbox/leadbox';
import { CareerPage } from '../page-building/career/career-page';
import { PersonioJobPosition } from '../@types/personio';

interface CareerQuery {
  htmlAst: string;
  fields: {
    socialCard: string;
  };
}

interface CareerPageProps {
  pageContext: {
    positions: PersonioJobPosition[];
    language: string;
  };
  location: Location;
  data: {
    markdownRemark: CareerQuery;
    locales: {
      edges: {
        node: {
          ns: string;
          language: string;
          data: string;
        };
      }[];
    };
  };
}

const Career = ({
  pageContext,
  data,
  location,
}: CareerPageProps): JSX.Element => {
  const { t } = useTranslation();
  const socialCard = data.markdownRemark?.fields?.socialCard;

  return (
    <>
      <SEO
        imageUrl={socialCard}
        title={t('career.seo.title')}
        description={t('career.seo.description')}
        location={location}
      />
      <CareerPage positions={pageContext.positions} />
    </>
  );
};

export default Career;

export const CareerPageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/career)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
      fields {
        socialCard
      }
      frontmatter {
        title
        language
      }
    }
  }
`;
