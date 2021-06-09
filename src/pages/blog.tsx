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
import { formatDate } from '../components/util/format-date';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

const TOP_POST_COUNT = 2;

interface AllBlogPostsQuery {
  allMarkdownRemark: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: {
        date: string;
        path: string;
        title: string;
        featuredImage: IGatsbyImageData;
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
  color: ${(props) => props.theme.palette.text.headerLight};
  margin-bottom: 48px;

  ${up('md')} {
    margin-bottom: 80px;
  }
`;

const BlogPage: React.FC = () => {
  const data = useStaticQuery<AllBlogPostsQuery>(graphql`
    query getBlogPosts {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 250, truncate: true)
          frontmatter {
            date
            path
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  aspectRatio: 1.77
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          rawMarkdownBody
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
    <Layout light>
      <SEO title="Blog | Satellytes" />
      <Grid center>
        <GridItem>
          <BlogPageTitle>Blog</BlogPageTitle>
        </GridItem>
      </Grid>
      <Grid center>
        {topBlogPosts.map((post) => (
          <BlogCard
            key={post.id}
            large={true}
            image={getImage(post.featuredImage)}
            title={post.title}
            text={post.excerpt}
            caption={formatDate(post.date)}
            link={post.path}
          />
        ))}

        {remainingBlogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={getImage(post.featuredImage)}
            title={post.title}
            text={post.excerpt}
            caption={formatDate(post.date)}
            link={post.path}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export default BlogPage;
