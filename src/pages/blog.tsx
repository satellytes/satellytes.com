import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
import Layout from '../components/layout/layout';
import { up } from '../components/breakpoint/breakpoint';
import { Grid, GridItem } from '../components/grid/grid';
import { PageTitle } from '../components/typography/typography';
import { BlogCard } from '../components/cards/blog-card';

const TOP_POST_COUNT = 2;

const LOCALE = 'de-DE';
const DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface AllBlogPostsQuery {
  allMarkdownRemark: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: {
        date: string;
        path: string;
        title: string;
        previewImage?: boolean;
      };
      rawMarkdownBody: string;
    }[];
  };
  blogPlaceholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const BlogPageTitle = styled(PageTitle)`
  margin-bottom: 48px;

  ${up('md')} {
    margin-bottom: 80px;
  }
`;

const getDateString = (date: string): string => {
  const now = new Date();
  const yesterday = new Date(new Date().setDate(now.getDate() - 1));
  const parsedDate = new Date(date);

  const isToday =
    now.toISOString().slice(0, 10) === parsedDate.toISOString().slice(0, 10);
  const isYesterday =
    yesterday.toISOString().slice(0, 10) ===
    parsedDate.toISOString().slice(0, 10);

  if (isToday) return 'Heute';
  else if (isYesterday) return 'Gestern';
  else return parsedDate.toLocaleDateString(LOCALE, DATE_OPTIONS);
};

const BlogPage: React.FC = () => {
  const data = useStaticQuery<AllBlogPostsQuery>(graphql`
    query getBlogPosts {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
          excerpt(pruneLength: 250, truncate: true)
          frontmatter {
            date
            path
            title
            previewImage
          }
          rawMarkdownBody
        }
      }
      blogPlaceholderImage: file(
        relativePath: { eq: "jj-shev-skjev5280-Rpdxgm74nOg-unsplash-small.jpg" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const blogPosts = data.allMarkdownRemark.nodes.map((post) => {
    return {
      id: post.id,
      excerpt: post.excerpt,
      ...post.frontmatter,
    };
  });

  const topBlogPosts = blogPosts.slice(0, TOP_POST_COUNT);
  const remainingBlogPosts = blogPosts.slice(TOP_POST_COUNT);

  return (
    <Layout>
      <SEO title="Blog" />
      <Grid center>
        <GridItem>
          <BlogPageTitle>Blog</BlogPageTitle>
        </GridItem>
      </Grid>
      <Grid center>
        {topBlogPosts.map((post) => (
          <BlogCard
            key={post.id}
            size="L"
            image={post.previewImage}
            placeholderImage={data.blogPlaceholderImage.childImageSharp.fluid}
            title={post.title}
            text={post.excerpt}
            caption={getDateString(post.date)}
            link={post.path}
          />
        ))}

        {remainingBlogPosts.map((post) => (
          <BlogCard
            key={post.id}
            size="S"
            image={post.previewImage}
            placeholderImage={data.blogPlaceholderImage.childImageSharp.fluid}
            title={post.title}
            text={post.excerpt}
            caption={getDateString(post.date)}
            link={post.path}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export default BlogPage;
