import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  CaptionText,
  PageTitle,
  LargeText,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const CardGridContainer = styled.div`
  margin-top: 40px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const ClientsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Clients" />
      <Grid>
        <GridItem xs={12} md={8}>
          <PageTitle>Clients</PageTitle>
          <LargeText>
            We are showing clients not projects since we are aiming for long
            term relationships.
          </LargeText>
          <LargeText>
            For all of the listed clients, we have done or are still doing
            (major parts of) their web applications.
          </LargeText>
          <CaptionText>Not just a set of banners or a microsite.</CaptionText>
          <CardGridContainer>TODO: CardGrid</CardGridContainer>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ClientsPage;
