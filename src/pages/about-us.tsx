import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { AboutUsPage } from '../components/pages/about-us/about-us-page';
import {
  ContentfulAboutUsImpression,
  ContentfulLeadBox,
  ContentfulPage,
  ContentfulSectionHeader,
  SyTeamMember,
} from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutUsQueryProps {
  hero: IGatsbyImageData;
  contentfulPage: ContentfulPage;
  contentfulLeadbox: ContentfulLeadBox;
  sectionHeaderImpressions: ContentfulSectionHeader;
  sectionHeaderTeam: ContentfulSectionHeader;
  allContentfulTeamMember: {
    nodes: SyTeamMember[];
  };
  allContentfulAboutUsImpressions: {
    nodes: ContentfulAboutUsImpression[];
  };
  locales: LocalesQueryProps;
}

const AboutUs = ({ data }: PageProps<AboutUsQueryProps>) => {
  return (
    <AboutUsPage
      title={data.contentfulPage.title}
      description={data.contentfulPage.description?.description as string}
      heroImageData={data.hero}
      impressions={data.allContentfulAboutUsImpressions.nodes}
      team={data.allContentfulTeamMember.nodes}
      sectionHeaderImpressions={data.sectionHeaderImpressions}
      sectionHeaderTeam={data.sectionHeaderTeam}
      leadbox={data.contentfulLeadbox}
    />
  );
};

export default AboutUs;

export const Head = ({ data, location }: PageProps<AboutUsQueryProps>) => {
  return (
    <SEO
      title={`${data.contentfulPage.title} | Satellytes`}
      location={location}
      locales={data.locales}
    />
  );
};

export const AboutUsPageQuery = graphql`
  query ($language: String!) {
    hero: file(relativePath: { eq: "office/sy-office-05.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    contentfulPage(slug: { eq: "about-us" }, node_locale: { eq: $language }) {
      title
      description {
        description
      }
    }

    sectionHeaderImpressions: contentfulSectionHeader(
      slug: { eq: "about-impression" }
      node_locale: { eq: $language }
    ) {
      slug
      kicker
      headline
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    sectionHeaderTeam: contentfulSectionHeader(
      slug: { eq: "about-team" }
      node_locale: { eq: $language }
    ) {
      slug
      kicker
      headline
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    contentfulLeadbox(
      slug: { eq: "about-leadbox" }
      node_locale: { eq: $language }
    ) {
      title
      illustration
      link {
        title
        href
      }
    }

    allContentfulTeamMember(filter: { node_locale: { eq: "en" } }) {
      nodes {
        id
        name
        image {
          gatsbyImageData(
            width: 400
            aspectRatio: 1
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            cropFocus: FACE
            resizingBehavior: FILL
            jpegProgressive: false
          )
        }
      }
    }

    allContentfulAboutUsImpressions(
      filter: { node_locale: { eq: "en" } }
      sort: { name: ASC }
    ) {
      nodes {
        tileSize
        id
        image {
          gatsbyImageData(resizingBehavior: FILL, jpegProgressive: false)
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
