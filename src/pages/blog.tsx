import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/layout/seo';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { BlogPage } from '../components/pages/blog/blog-page';

interface AllBlogPostsQuery {
  nodes: {
    id: string;
    excerpt: string;
    frontmatter: {
      date: string;
      path: string;
      title: string;
      teaserText?: string;
      featuredImage: IGatsbyImageData;
    };
    rawMarkdownBody: string;
  }[];
  blogPlaceholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface BlogPageQueryProps {
  allMarkdownRemark: AllBlogPostsQuery;
}

const Blog = ({ data, location }: PageProps<BlogPageQueryProps>) => {
  const blogPosts = data.allMarkdownRemark.nodes;

  return (
    <>
      <SEO title="Blog | Satellytes" location={location} />
      <BlogPage posts={blogPosts} />
    </>
  );
};

export default Blog;

export const BlogPageQuery = graphql`
  query ($language: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 500)
        frontmatter {
          date
          path
          title
          teaserText
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                aspectRatio: 1.77
                layout: CONSTRAINED
                placeholder: BLURRED
                transformOptions: { cropFocus: CENTER }
              )
            }
          }
        }
        rawMarkdownBody
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
