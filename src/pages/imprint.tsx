import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const ImprintPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Imprint" />
      <Grid>
        <GridItem>
          <PageTitle>Imprint</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ImprintPage;
