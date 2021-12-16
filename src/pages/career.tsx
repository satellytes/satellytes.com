import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerPage } from '../page-building/career/career-page';
import { LocalesQuery, SyPersonioJob } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface CareerMarkdownQuery {
  htmlAst: string;
  fields: {
    socialCard: string;
  };
}

interface CareerProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: CareerMarkdownQuery;
    allSyPersonioJob: {
      nodes: SyPersonioJob[];
    };
    hero: IGatsbyImageData;
  };
  location: Location;
}

const Career = (props: CareerProps) => {
  const { t } = useTranslation();
  const socialCard = props.data.markdownRemark?.fields?.socialCard;

  return (
    <>
      <SEO
        imageUrl={socialCard}
        title={`${t('career.title')} | Satellytes`}
        description={t('career.seo.description')}
        location={props.location}
      />
      <CareerPage
        heroImageData={props.data.hero}
        positions={props.data.allSyPersonioJob.nodes}
      />
    </>
  );
};

export default Career;

export const CareerPageQuery = graphql`
  query ($language: String!) {
    hero: file(relativePath: { eq: "office/sy-office-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    allSyPersonioJob(filter: { lang: { eq: $language } }) {
      nodes {
        id
        lang
        jobId
        name
        short
        createdAt
        slug
        fields {
          path
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

    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/career)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      fields {
        socialCard
      }
    }
  }
`;
