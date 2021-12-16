import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../new-components/layout/seo';
import { PageTitle, Text } from '../components/typography/typography';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LocalesQuery } from '../types';
import { BlogPage } from '../page-building/blog/blog-page';

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

interface BlogPageProps {
  data: {
    locales: LocalesQuery;
    allMarkdownRemark: AllBlogPostsQuery;
  };
  location: Location;
}

const Blog = ({ data, location }: BlogPageProps) => {
  const { t } = useTranslation();
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
              )
            }
          }
        }
        rawMarkdownBody
      }
    }
  }
`;
