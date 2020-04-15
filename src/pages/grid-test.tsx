import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';

const Card = styled.div`
  color: black;
  background-color: white;
  border: 1px solid black;
  text-align: center;
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Grid Example" />
    <Grid>
      <GridItem>
        <h2>Grid</h2>
      </GridItem>
    </Grid>
    <Grid>
      <GridItem sm={6}>
        <Card>xs=12 | sm=6</Card>
      </GridItem>
      <GridItem sm={6}>
        <Card>xs=12 | sm=6</Card>
      </GridItem>
      <GridItem sm={12} md={4}>
        <Card>xs=default | sm=12 | md=3</Card>
      </GridItem>
      <GridItem sm={12} md={4}>
        <Card>xs=default | sm=6 | md=3</Card>
      </GridItem>
      <GridItem sm={12} md={4}>
        <Card>xs=default | sm=6 | md=3</Card>
      </GridItem>
    </Grid>
    <Grid>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
      <GridItem lg={1}>
        <Card>xs=default | lg=1</Card>
      </GridItem>
    </Grid>
    <Grid>
      <GridItem>
        <h2>Grid no gap</h2>
      </GridItem>
    </Grid>
    <Grid disableGap>
      <GridItem sm={6}>
        <Card>sm=6 | no gap</Card>
      </GridItem>
      <GridItem sm={6}>
        <Card>sm=6 | no gap</Card>
      </GridItem>
    </Grid>
    <Grid>
      <GridItem>
        <h2>Grid in Grid</h2>
      </GridItem>
    </Grid>
    <Grid>
      <GridItem sm={6}>
        <Grid>
          <GridItem sm={6}>
            <Card>xs=6</Card>
          </GridItem>
          <GridItem sm={6}>
            <Card>xs=6</Card>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem sm={6}>
        <Grid disableGap>
          <GridItem sm={6}>
            <Card>xs=6 no gap</Card>
          </GridItem>
          <GridItem sm={6}>
            <Card>xs=6 no gap</Card>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  </Layout>
);

export default IndexPage;
