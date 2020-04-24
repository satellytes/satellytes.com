import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { Typography } from '../components/typography/typography';
import styled from 'styled-components';
import { up, down } from '../components/breakpoint/breakpoint';

const Title = styled.div`
  margin-top: 108px;
  margin-bottom: 280px;

  ${up('md')} {
    margin-top: 192px;
    margin-bottom: 360px;
  }
`;

const Subtitle = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;

  ${up('md')} {
    margin-top: 160px;
    margin-bottom: 120px;
  }
`;

const DesktopOnlyBreak = styled.br`
  ${down('md')} {
    display: none;
  }
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Grid>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <Title>
          <Typography variant="h1">
            Full Stack <br />
            Digital Service <br />
            Agency
          </Typography>
        </Title>
        <Subtitle>
          <Typography variant="h2">
            We offer only <DesktopOnlyBreak />
            what we are <DesktopOnlyBreak />
            truly great at.
          </Typography>
        </Subtitle>
        <p>Card</p>
        <Subtitle>
          <Typography variant="h2">
            We are into <DesktopOnlyBreak />
            relationships, not <DesktopOnlyBreak />
            one-night-stands.
          </Typography>
        </Subtitle>
        <p>Card</p>
        <p>List</p>
        <Subtitle>
          <Typography variant="h2">
            We are on your <DesktopOnlyBreak />
            side - and the <DesktopOnlyBreak />
            customer&lsquo;s.
          </Typography>
        </Subtitle>
        <p>Card</p>
      </GridItem>
    </Grid>
  </Layout>
);

export default IndexPage;
