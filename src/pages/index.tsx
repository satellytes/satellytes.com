import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import {
  PageTitle,
  SectionTitle,
  TitleSvg,
  StyledTitle,
} from '../components/typography/typography';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { BlockTeaser } from '../components/teasers/block-teaser';
import { Text } from '../components/typography/typography';
import { ClientList } from '../components/client-list/client-list';
import { clients } from '../components/client-list/fixtures';

const HomePageTitle = styled(PageTitle)`
  margin-top: 108px;
  margin-bottom: 280px;

  color: #ffffff;

  ${up('md')} {
    margin-top: 192px;
    margin-bottom: 360px;
  }

  ${TitleSvg} {
    left: 2px;
  }

  ${StyledTitle} {
    font-size: 32px;
    ${up('md')} {
      font-size: 72px;
    }
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

const IndexPage: React.FC = () => (
  <Layout isIndexPage={true}>
    <SEO title="Home" />
    <Grid center>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <HomePageTitle>Full Stack Digital Service Agency</HomePageTitle>
        <HomePageSubTitle>
          We offer only what we are truly great at.
        </HomePageSubTitle>
        <BlockTeaser
          preTitle="Services"
          title="Full Stack"
          link="All Services >"
          linkTo="/services"
        >
          <Text>
            Satellytes ist eine Digital-Agentur, die um große Unternehmen kreist
            und ihnen bei der Transformation und Optimierung digitaler Services
            und Interfaces hilft. Wir bieten „Full Stack“ an, also den gesamten
            Prozess von Ideation bis zur Implementierung des letzten
            performanten Funnels und der letzten Zeile wunderschönen Codes.
          </Text>
        </BlockTeaser>
        <HomePageSubTitle>
          We are into relationships, not one-night-stands.
        </HomePageSubTitle>
        <BlockTeaser
          preTitle="Clients"
          title="Long term projects not fire & forget"
          splitView
        >
          <Text>
            We are showing clients not projects since we are aiming for long
            term relationships.
          </Text>
          <Text>
            We are really good at creating design systems for complex web
            applications and self-testing, high performance pattern libraries.
          </Text>
        </BlockTeaser>
        <ClientList clients={clients} />
        <HomePageSubTitle>
          We are on your side - and the customer&lsquo;s.
        </HomePageSubTitle>
        <BlockTeaser
          preTitle="About"
          title="Passionate geeks with high ambitions"
          link="About us"
          linkTo="/about"
          splitView
        >
          <Text>
            We are showing clients not projects since we are aiming for long
            term relationships.
          </Text>
          <Text>
            We are really good at creating design systems for complex web
            applications and self-testing, high performance pattern libraries.
          </Text>
        </BlockTeaser>
      </GridItem>
    </Grid>
  </Layout>
);

export default IndexPage;
