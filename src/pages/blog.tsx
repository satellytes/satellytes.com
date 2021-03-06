import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
import Layout from '../components/layout/layout';
import { Grid, GridItem } from '../components/grid/grid';
import { PageTitle, Text } from '../components/typography/typography';
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
  margin-bottom: 40px;
`;

const BlogPageSubTitle = styled(Text)`
  margin-bottom: 40px;
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
          excerpt(pruneLength: 500)
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

  const blogPosts = data.allMarkdownRemark.nodes;

  return (
    <Layout light>
      <SEO title="Blog | Satellytes" />
      <Grid center>
        <GridItem>
          <BlogPageTitle>Blog</BlogPageTitle>
        </GridItem>
        <GridItem md={8}>
          <BlogPageSubTitle>
            Our developers and designers talk about the latest trends and
            know-how around tech, especially about our latest learnings and
            insights on creating good software for the web.
          </BlogPageSubTitle>
        </GridItem>
      </Grid>
      <Grid center>
        {blogPosts.map((post, index) => {
          const topBlogPost = index < TOP_POST_COUNT;

          return (
            <BlogCard
              key={post.id}
              large={topBlogPost}
              image={getImage(post.frontmatter.featuredImage)}
              title={post.frontmatter.title}
              text={post.excerpt}
              caption={formatDate(post.frontmatter.date)}
              link={post.frontmatter.path}
            />
          );
        })}
      </Grid>
    </Layout>
  );
};

export default BlogPage;
