import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerPage } from '../page-building/career/career-page';
import { SyPersonioJob } from '../@types/personio';
import { LocalesQuery } from '../@types/blog';

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
        title={`${t('contact.title')} | Satellytes`}
        description={t('contact.info')}
        location={props.location}
      />
      <CareerPage positions={props.data.allSyPersonioJob.nodes} />
    </>
  );
};

export default Career;

export const CareerPageQuery = graphql`
  query ($language: String!) {
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
