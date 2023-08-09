import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { CareerPage } from '../components/pages/career/career-page';
import {
  ContentfulLeadBox,
  ContentfulPage,
  ContentfulSectionHeader,
  ContentfulVacancy,
} from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { OfficeImage } from './index';

interface CareerPageQueryProps {
  officeImages: {
    nodes: OfficeImage[];
  };
  hero: IGatsbyImageData;
  contentfulPage: ContentfulPage;
  contentfulLeadbox: ContentfulLeadBox;
  careerIntroduction: ContentfulSectionHeader;
  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
}

const Career = ({ data, location }: PageProps<CareerPageQueryProps>) => {
  const officeImages = data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        description={data.contentfulPage.seoMetaText}
        location={location}
      />
      <CareerPage
        heroImageData={data.hero}
        positions={data.allContentfulVacancy.nodes}
        officeImages={officeImages}
        page={data.contentfulPage}
        leadbox={data.contentfulLeadbox}
        careerIntroduction={data.careerIntroduction}
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

    contentfulPage(slug: { eq: "career" }, node_locale: { eq: $language }) {
      title
      seoMetaText
    }

    contentfulLeadbox(
      slug: { eq: "career-leadbox" }
      node_locale: { eq: $language }
    ) {
      title
      illustration
      contact {
        headline
        title
        email
      }
    }

    careerIntroduction: contentfulSectionHeader(
      slug: { eq: "career-introduction" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      paragraphs {
        paragraph {
          paragraph
        }
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
