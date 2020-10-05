import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { ClientList } from '../components/client-list/client-list';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { BlockTeaser } from '../components/teasers/block-teaser';
import {
  PageTitle,
  SectionTitle,
  StyledTitle,
  Text,
  TitleSvg,
} from '../components/typography/typography';

interface AllClientsQuery {
  allClientsJson: {
    nodes: {
      start: string;
      name: string;
      path: string;
    }[];
  };
}

const HomePageTitle = styled(PageTitle)`
  margin-bottom: 280px;

  color: #ffffff;

  ${up('md')} {
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

const IndexPage: React.FC = () => {
  const data = useStaticQuery<AllClientsQuery>(graphql`
    query {
      allClientsJson {
        nodes {
          name
          path
          start
        }
      }
    }
  `);

  return (
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
              Satellytes ist eine Digital-Agentur, die um große Unternehmen
              kreist und ihnen bei der Transformation und Optimierung digitaler
              Services und Interfaces hilft. Wir bieten „Full Stack“ an, also
              den gesamten Prozess von Ideation bis zur Implementierung des
              letzten performanten Funnels und der letzten Zeile wunderschönen
              Codes.
            </Text>
          </BlockTeaser>
          <HomePageSubTitle>
            We are into relationships, not one-night-stands.
          </HomePageSubTitle>
        </GridItem>
        <GridItem xs={0} md={2} />
        <GridItem xs={0} md={1} />
        <GridItem xs={12} md={10}>
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
          <ClientList clients={data.allClientsJson.nodes} />
        </GridItem>
        <GridItem xs={0} md={1} />
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <HomePageSubTitle>
            We are on your side - and the customer&lsquo;s.
          </HomePageSubTitle>
        </GridItem>
        <GridItem xs={0} md={2} />
        <GridItem xs={0} md={1} />
        <GridItem xs={12} md={10}>
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
};

export default IndexPage;
