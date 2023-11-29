import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { BlogOverviewPageContext } from '../../gatsby/create-pages/create-blog-post-overview-pages';
import SEO from '../components/layout/seo';
import { BlogPage } from '../components/pages/blog/blog-page';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ContentfulSectionHeader } from '../types';

interface AllBlogPostsQuery {
  nodes: {
    fields: {
      path: string;
    };
    heroImage: {
      image: IGatsbyImageData;
    };
    id: string;
    publicationDate: string;
    teaserText: string;
    title: string;
  }[];
}

interface BlogPageQueryProps {
  allContentfulBlogPost: AllBlogPostsQuery;
  blogHeader: ContentfulSectionHeader;
}

const Blog = ({
  data,
  pageContext,
}: PageProps<BlogPageQueryProps, BlogOverviewPageContext>) => {
  const blogPosts = data.allContentfulBlogPost.nodes;

  return (
    <BlogPage
      posts={blogPosts}
      header={data.blogHeader}
      pagination={{
        ...pageContext,
      }}
    />
  );
};

export default Blog;

export const Head = ({
  pageContext,
  location,
}: PageProps<BlogPageQueryProps, BlogOverviewPageContext>) => {
  return (
    <SEO
      title="Blog | Satellytes"
      location={location}
      rssLink
      noIndex={pageContext.currentPage !== 1}
    />
  );
};

export const BlogPageQuery = graphql`
  query ($language: String!, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      filter: { node_locale: { eq: "en" } }
      sort: { publicationDate: DESC }
      limit: $limit
      skip: $skip
    ) {
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

    blogHeader: contentfulSectionHeader(
      slug: { eq: "blog-introduction" }
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
