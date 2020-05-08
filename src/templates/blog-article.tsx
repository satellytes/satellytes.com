import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const BlogArticleTemplate: React.FC = () => {
  return (
    <Layout>
      <SEO title="Blog article" />
      <Grid>
        <GridItem>
          <PageTitle>This is a blog article</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default BlogArticleTemplate;
