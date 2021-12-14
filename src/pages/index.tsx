import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import { Landingpage } from '../page-building/landingpage/landingpage';
import { BlogPostTeaser, LocalesQuery, SyPersonioJob } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

interface IndexPageProps {
  data: {
    locales: LocalesQuery;

    allSyPersonioJob: {
      nodes: SyPersonioJob[];
    };
    allMarkdownRemark: {
      nodes: BlogPostTeaser[];
    };
    officeImages: {
      nodes: OfficeImage[];
    };
  };
  location: Location;
}

const IndexPage = (props: IndexPageProps) => {
  const jobPositions = props.data.allSyPersonioJob.nodes;
  const blogPosts = props.data.allMarkdownRemark.nodes;
  const officeImages = props.data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <>
      <SEO title="Satellytes" location={props.location} />
      <Landingpage
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

    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
      limit: 3
    ) {
      nodes {
        id
        frontmatter {
          date
          path
          title
          teaserText
          featuredImage {
            childImageSharp {
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
    }
  }
`;
