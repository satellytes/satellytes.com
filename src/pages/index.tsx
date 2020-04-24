import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { PageTitle, SectionTitle } from '../components/typography/typography';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { BlockTeaser } from '../components/teasers/block-teaser';

const HomePageTitle = styled(PageTitle)`
  margin-top: 108px;
  margin-bottom: 280px;

  ${up('md')} {
    margin-top: 192px;
    margin-bottom: 360px;
  }
`;

const HomePageSubTitle = styled(SectionTitle)`
  margin-top: 80px;
  margin-bottom: 80px;

  ${up('md')} {
    margin-top: 160px;
    margin-bottom: 120px;
  }
`;

const ClientList = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;

  ${up('md')} {
    margin-top: 120px;
    margin-bottom: 160px;
  }
`;

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Grid>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <HomePageTitle>Full Stack Digital Service Agency</HomePageTitle>
        <HomePageSubTitle>
          We offer only what we are truly great at.
        </HomePageSubTitle>
        <BlockTeaser
          preTitle="Services"
          title="Full Stack"
          text="Satellytes ist eine Digital-Agentur, die um große Unternehmen kreist und ihnen bei der Transformation und Optimierung digitaler Services und Interfaces hilft. Wir bieten „Full Stack“ an, also den gesamten Prozess von Ideation bis zur Implementierung des letzten performanten Funnels und der letzten Zeile wunderschönen Codes."
          link="All Services >"
        />
        <HomePageSubTitle>
          We are into relationships, not one-night-stands.
        </HomePageSubTitle>
        <BlockTeaser
          preTitle="Clients"
          title="Long term projects not fire & forget"
          text="We are showing clients not projects since we are aiming for long term relationships.
We are really good at creating design systems for complex web applications and self-testing, high performance pattern libraries."
          splitView
        />
        <ClientList>List</ClientList>
        <HomePageSubTitle>
          We are on your side - and the customer&lsquo;s.
        </HomePageSubTitle>
        <p>Card</p>
      </GridItem>
    </Grid>
  </Layout>
);

export default IndexPage;
