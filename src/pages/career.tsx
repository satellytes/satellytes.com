import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Card } from '../components/cards/card';

const CareerPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Career" />
      <Grid>
        <GridItem>
          <PageTitle>Career</PageTitle>
        </GridItem>
      </Grid>
      <Grid>
        <Card
          title="Junior UI Designer"
          text="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna."
          link="/"
        />
      </Grid>
    </Layout>
  );
};

export default CareerPage;
