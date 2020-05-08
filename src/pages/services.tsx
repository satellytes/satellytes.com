import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Services" />
      <Grid>
        <GridItem>
          <PageTitle>Services</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ServicesPage;
