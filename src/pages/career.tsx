import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const CareerPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Career" />
      <Grid>
        <GridItem>
          <PageTitle>Career</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CareerPage;
