import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import { SyPersonioJob } from '../@types/personio';
import {
  Landingpage,
  LocalesQuery,
} from '../page-building/landingpage/landingpage';
import { BlogPostTeaser } from '../@types/blog';

interface IndexPageProps {
  data: {
    locales: LocalesQuery;

    allSyPersonioJob: {
      nodes: SyPersonioJob[];
    };
    allMarkdownRemark: {
      nodes: BlogPostTeaser[];
    };
  };
  location: Location;
}

const IndexPage = (props: IndexPageProps) => {
  const jobPositions = props.data.allSyPersonioJob.nodes;
  const blogPosts = props.data.allMarkdownRemark.nodes;

  return (
    <>
      <SEO title="Satellytes" location={location} />
      <Landingpage positions={jobPositions} posts={blogPosts} />
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
