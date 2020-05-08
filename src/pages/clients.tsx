import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const ClientsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Clients" />
      <Grid>
        <GridItem>
          <PageTitle>Clients</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ClientsPage;
