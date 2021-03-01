import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const NotFoundTitle = styled(SubTitle)`
  ${up('md')} {
    margin-top: 220px;
  }
`;

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found | Satellytes Digital Consulting GmbH" />
    <Grid center>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <NotFoundTitle>
          Oh sorry! Our Satellite took the wrong direction.
        </NotFoundTitle>
      </GridItem>
    </Grid>
  </Layout>
);

export default NotFoundPage;
