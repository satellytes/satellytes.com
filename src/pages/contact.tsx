import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <Grid>
        <GridItem>
          <PageTitle>Contact</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
