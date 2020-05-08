import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const DataPrivacyPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Data privacy" />
      <Grid>
        <GridItem>
          <PageTitle>Data privacy</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default DataPrivacyPage;
