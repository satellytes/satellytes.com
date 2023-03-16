import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerPage } from '../components/pages/career/career-page';
import { ContentfulVacancy } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { OfficeImage } from './index';

interface CareerPageQueryProps {
  officeImages: {
    nodes: OfficeImage[];
  };
  hero: IGatsbyImageData;

  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
}

const Career = (props: PageProps<CareerPageQueryProps>) => {
  const { t } = useTranslation();

  const officeImages = props.data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <>
      <SEO
        title={`${t('career.title')} | Satellytes`}
        description={t<string>('career.seo.description')}
        location={props.location}
      />
      <CareerPage
        heroImageData={props.data.hero}
        positions={props.data.allContentfulVacancy.nodes}
        officeImages={officeImages}
      />
    </>
  );
};

export default Career;

export const CareerPageQuery = graphql`
  query ($language: String!) {
    officeImages: allFile(filter: { relativeDirectory: { eq: "office" } }) {
      nodes {
        id
        relativePath
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }

    hero: file(relativePath: { eq: "office/sy-office-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    allContentfulVacancy(filter: { node_locale: { eq: $language } }) {
      nodes {
        id
        name
        shortDescription {
          shortDescription
        }
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
