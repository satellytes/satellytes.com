import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { PageTitle, SectionTitle } from '../components/typography/typography';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const Title = styled(PageTitle)`
  margin-top: 108px;
  margin-bottom: 280px;

  ${up('md')} {
    margin-top: 192px;
    margin-bottom: 360px;
  }
`;

const SubTitle = styled(SectionTitle)`
  margin-top: 80px;
  margin-bottom: 80px;

  ${up('md')} {
    margin-top: 160px;
    margin-bottom: 120px;
  }
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Grid>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <Title>Full Stack Digital Service Agency</Title>
        <SubTitle>We offer only what we are truly great at.</SubTitle>
        <p>Card</p>
        <SubTitle>We are into relationships, not one-night-stands.</SubTitle>
        <p>Card</p>
        <p>List</p>
        <SubTitle>We are on your side - and the customer&lsquo;s.</SubTitle>
        <p>Card</p>
      </GridItem>
    </Grid>
  </Layout>
);

export default IndexPage;
