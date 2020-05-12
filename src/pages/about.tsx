import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import React from 'react';
import {
  PageTitle,
  SubTitle,
  TitleText,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const AboutSubTitle = styled(SubTitle)`
  margin-top: 80px;
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: 160px;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="About" />
      <Grid>
        <GridItem xs={12} md={8}>
          <PageTitle>About us</PageTitle>
          <TitleText>
            We are a growing bunch of passionate geeks with the highest
            ambitions
          </TitleText>
          <AboutSubTitle>Thinking</AboutSubTitle>
          <div>TODO: Cards</div>
          <AboutSubTitle>Team</AboutSubTitle>
          <div>TODO: TeamCards</div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
