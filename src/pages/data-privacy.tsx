import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const DataPrivacyPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Data Privacy" />
      <Grid>
        <GridItem>
          <PageTitle>Data Privacy</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default DataPrivacyPage;
