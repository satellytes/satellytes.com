import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { CareerPage } from '../components/pages/career/career-page';
import {
  ContentfulAccordion,
  ContentfulLeadBox,
  ContentfulPage,
  ContentfulSectionHeader,
  ContentfulTeaser,
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
  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
  introductionHeader: ContentfulSectionHeader;
  applicationProcessHeader: ContentfulSectionHeader;
  openingsHeader: ContentfulSectionHeader;
  cultureHeader: ContentfulSectionHeader;
  perksHeader: ContentfulSectionHeader;
  cultureTeaser: ContentfulTeaser;
  perksTeaser: ContentfulTeaser;
  applicationProcessAccordion: ContentfulAccordion;
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
        introductionHeader={data.introductionHeader}
        applicationProcessHeader={data.applicationProcessHeader}
        openingsHeader={data.openingsHeader}
        cultureHeader={data.cultureHeader}
        perksHeader={data.perksHeader}
        cultureTeaser={data.cultureTeaser.gridItems}
        perksTeaser={data.perksTeaser.gridItems}
        applicationProcessAccordion={
          data.applicationProcessAccordion.accordionItems
        }
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

    hero: file(relativePath: { eq: "office/sy-office-07.jpg" }) {
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

    introductionHeader: contentfulSectionHeader(
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

    applicationProcessHeader: contentfulSectionHeader(
      slug: { eq: "career-application" }
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

    openingsHeader: contentfulSectionHeader(
      slug: { eq: "career-openings" }
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

    cultureHeader: contentfulSectionHeader(
      slug: { eq: "career-culture" }
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

    perksHeader: contentfulSectionHeader(
      slug: { eq: "career-perks" }
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

    cultureTeaser: contentfulTeaserGrid(
      slug: { eq: "career-culture" }
      node_locale: { eq: $language }
    ) {
      gridItems {
        title
        as
        illustration
        description {
          description
        }
      }
    }

    perksTeaser: contentfulTeaserGrid(
      slug: { eq: "career-perks" }
      node_locale: { eq: $language }
    ) {
      gridItems {
        title
        as
        illustration
        description {
          description
        }
      }
    }

    applicationProcessAccordion: contentfulAccordion(
      slug: { eq: "career-application-process" }
      node_locale: { eq: $language }
    ) {
      accordionItems {
        title
        paragraph {
          paragraph
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
