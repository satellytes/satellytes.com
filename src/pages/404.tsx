import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Grid>
      <GridItem>
        <PageTitle>Oh sorry! Our Satellite took the wrong direction.</PageTitle>
      </GridItem>
    </Grid>
  </Layout>
);

export default NotFoundPage;
