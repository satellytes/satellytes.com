import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const ClientDetailsTemplate: React.FC = () => {
  return (
    <Layout>
      <SEO title="Client details" />
      <Grid>
        <GridItem>
          <PageTitle>This is a client details page</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ClientDetailsTemplate;
