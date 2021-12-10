import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SyPersonioJob } from '../@types/personio';
import {
  Landingpage,
  LocalesQuery,
} from '../page-building/landingpage/landingpage';

interface IndexPageProps {
  data: {
    locales: LocalesQuery;

    allSyPersonioJob: {
      nodes: SyPersonioJob[];
    };
  };
  location: Location;
}

const IndexPage = ({
  location,
  data: { allSyPersonioJob },
}: IndexPageProps) => {
  const { t } = useTranslation();
  const jobPositions = allSyPersonioJob.nodes;

  return (
    <>
      <SEO title="Satellytes" location={location} />
      <Landingpage positions={jobPositions} />
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
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
  }
`;
