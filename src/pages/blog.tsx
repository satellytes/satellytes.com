import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { BlogPage } from '../components/pages/blog/blog-page';

interface AllBlogPostsQuery {
  nodes: {
    fields: {
      path: string;
    };
    heroImage: {
      image: {
        publicUrl: string;
      };
    };
    id: string;
    publicationDate: string;
    teaserText: string;
    title: string;
  }[];
}

interface BlogPageQueryProps {
  allContentfulBlogPost: AllBlogPostsQuery;
}

const Blog = ({ data, location }: PageProps<BlogPageQueryProps>) => {
  const blogPosts = data.allContentfulBlogPost.nodes;

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
    allContentfulBlogPost(sort: { fields: publicationDate, order: DESC }) {
      nodes {
        fields {
          path
        }
        id
        title
        teaserText
        slug
        publicationDate
        heroImage {
          image {
            gatsbyImageData(
              width: 600
              aspectRatio: 1.77
              layout: CONSTRAINED
              placeholder: BLURRED
              cropFocus: CENTER
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
