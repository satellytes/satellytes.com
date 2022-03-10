import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerPage } from '../components/pages/career/career-page';
import { PlainFixedImageSharpSource, SyPersonioJob } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface CareerPageQueryProps {
  markdownRemark: {
    htmlAst: string;
    socialCardFile: PlainFixedImageSharpSource;
  };
  allSyPersonioJob: {
    nodes: SyPersonioJob[];
  };
  hero: IGatsbyImageData;
}

const Career = (props: PageProps<CareerPageQueryProps>) => {
  const { t } = useTranslation();
  const socialCardPath =
    props.data.markdownRemark.socialCardFile.childImageSharp.fixed.src;

  return (
    <>
      <SEO
        shareImagePath={socialCardPath}
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
      }
    }

    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/career)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      socialCardFile {
        childImageSharp {
          fixed(width: 1440, height: 760) {
            src
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
