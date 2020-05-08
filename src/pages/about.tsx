import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import React from 'react';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="About" />
      <Grid>
        <GridItem>
          <PageTitle>About us</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
