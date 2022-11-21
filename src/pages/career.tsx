import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerPage } from '../components/pages/career/career-page';
import { SyPersonioJob } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface CareerPageQueryProps {
  allSyPersonioJob: {
    nodes: SyPersonioJob[];
  };
  hero: IGatsbyImageData;
}

const Career = (props: PageProps<CareerPageQueryProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={`${t('career.title')} | Satellytes`}
        description={t<string>('career.seo.description')}
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
