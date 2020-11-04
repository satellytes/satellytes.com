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
  margin-bottom: 240px;

  color: #ffffff;

  ${up('md')} {
    margin-bottom: 300px;
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

const HomePageBlockTeaser = styled(BlockTeaser)`
  margin-bottom: ${(props) => (props.link ? '160px' : '40px')};

  ${up('md')} {
    margin-bottom: ${(props) => (props.link ? '160px' : '120px')};
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
          <HomePageBlockTeaser
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
          </HomePageBlockTeaser>
        </GridItem>
        <GridItem xs={0} md={2} />
        <GridItem xs={0} md={1} />
        <GridItem xs={12} md={10}>
          <HomePageBlockTeaser
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
          </HomePageBlockTeaser>
          <ClientList clients={data.allClientsJson.nodes} />
        </GridItem>
        <GridItem xs={0} md={1} />
        <GridItem xs={0} md={1} />
        <GridItem xs={12} md={10}>
          <HomePageBlockTeaser
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
          </HomePageBlockTeaser>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
