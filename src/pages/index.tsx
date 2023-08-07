import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { Landingpage } from '../components/pages/landingpage/landingpage';
import { BlogPostTeaser, ContentfulPage, ContentfulVacancy } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { StructuredOrganizationData } from '../components/pages/landingpage/structured-organization-data';

export interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

interface IndexPageQueryProps {
  contentfulPage: ContentfulPage;
  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
  allContentfulBlogPost: {
    nodes: BlogPostTeaser[];
  };
  officeImages: {
    nodes: OfficeImage[];
  };
}

const IndexPage = ({ data, location }: PageProps<IndexPageQueryProps>) => {
  const jobPositions = data.allContentfulVacancy.nodes;
  const blogPosts = data.allContentfulBlogPost.nodes;
  const officeImages = data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <>
      <SEO title={data.contentfulPage.title} location={location} rssLink />

      <StructuredOrganizationData />

      <Landingpage
        title={data.contentfulPage.title}
        description={data.contentfulPage.description?.description as string}
        officeImages={officeImages}
        positions={jobPositions}
        posts={blogPosts}
      />
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
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

    contentfulPage(
      slug: { eq: "landingpage" }
      node_locale: { eq: $language }
    ) {
      title
      description {
        description
      }
      seoMetaText
    }

    allContentfulVacancy(filter: { node_locale: { eq: $language } }, limit: 4) {
      nodes {
        id
        name
        shortDescription {
          shortDescription
        }
        slug
      }
    }

    allContentfulBlogPost(
      filter: { node_locale: { eq: "en" } }
      sort: { publicationDate: DESC }
      limit: 4
    ) {
      nodes {
        fields {
          path
        }
        id
        title
        teaserText
        publicationDate
        heroImage {
          image {
            gatsbyImageData(
              width: 400
              aspectRatio: 1.77
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
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
