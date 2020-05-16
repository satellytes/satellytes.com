import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Link } from 'gatsby';

const BlogPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Grid>
        <GridItem>
          <PageTitle>Blog</PageTitle>
        </GridItem>
        <GridItem>
          <Link to="/blog/how-to-do-a-blog-post">Blog Post</Link>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default BlogPage;
