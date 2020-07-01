import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, Link, useStaticQuery } from 'gatsby';

interface AllBlogPostsQuery {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: {
        date: string;
        path: string;
        title: string;
      };
    }[];
  };
}

const BlogPage: React.FC = () => {
  const data = useStaticQuery<AllBlogPostsQuery>(graphql`
    query getBlogPosts {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  `);

  const blogPosts = data.allMarkdownRemark.nodes.map((post) => {
    return {
      id: post.id,
      ...post.frontmatter,
    };
  });

  return (
    <Layout>
      <SEO title="Blog" />
      <Grid center>
        <GridItem>
          <PageTitle>Blog</PageTitle>
        </GridItem>
        <GridItem>
          <ul>
            {blogPosts.map((post) => (
              <li key={post.id}>
                <Link to={post.path}>
                  {post.title} ({post.date})
                </Link>
              </li>
            ))}
          </ul>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default BlogPage;
