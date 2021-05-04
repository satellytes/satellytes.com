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
  PageTitleSwoosh,
  StyledTitle,
  Text,
} from '../components/typography/typography';
import { HEADER_HEIGHT } from '../components/header/header';
import { Aurora, AuroraType } from '../components/aurora/aurora';

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
  height: 92vh;
  min-height: 300px;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: calc(96px + ${HEADER_HEIGHT});

  ${up('sm')} {
    min-height: 500px;
  }

  ${up('md')} {
    height: 100vh;
    padding-top: calc(192px + ${HEADER_HEIGHT});
  }

  color: #ffffff;

  ${PageTitleSwoosh} {
    top: -6px;
    height: 10px;
    width: 19px;

    ${up('sm')} {
      width: 42px;
      top: -14px;
      height: 15px;
    }
  }

  ${StyledTitle} {
    font-size: 32px;

    ${up('sm')} {
      font-size: 72px;
    }
  }
`;

const HomePageBlockTeaser = styled(BlockTeaser)<{
  margin?: boolean;
}>`
  margin-bottom: ${(props) => props.margin && '160px'};
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
    <>
      <Aurora type={AuroraType.BrightBlue} />
      <Layout transparentHeader={true}>
        <SEO title="Satellytes" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitle>
              Satellytes
              <br />
              Enterprise Web Applications
            </HomePageTitle>
          </GridItem>
          <GridItem xs={0} md={2} />
          <GridItem xs={0} md={1} />
          <GridItem xs={12} md={10}>
            <HomePageBlockTeaser
              margin
              preTitle="Leistungen"
              title="Das bieten wir"
              link="Leistungen"
              linkTo="/services"
            >
              <Text>
                Satellytes – das sind ausschließlich leidenschaftliche
                Entwickler:innen und Designer:innen. Wir haben großen Spaß an
                Technologie und freuen uns auf neue Herausforderungen. Dabei
                fokussieren wir uns auf langfristige Engagements im
                Konzerngeschäft.
              </Text>
            </HomePageBlockTeaser>
            <HomePageBlockTeaser
              preTitle="Kunden"
              title="Nachhaltige und moderne Projekte"
              splitView
            >
              <Text>
                Wir unterstützen große Konzerne bei der Umsetzung ihrer
                digitalen Strategien. Finden Sie heraus für welche Kunden &
                Branchen wir tätig sind.
              </Text>
            </HomePageBlockTeaser>
            <ClientList clients={data.allClientsJson.nodes} />
            <HomePageBlockTeaser
              preTitle="Karriere"
              title="Arbeite mit uns"
              splitView
              link="Karriere"
              linkTo="/career"
            >
              <Text>
                Wir suchen Entwickler:innen aus Leidenschaft! Du hast noch nicht
                viel Berufserfahrung? Kein Problem. Denn alles, was du wissen
                musst, lernst Du bei uns. Du kannst schon alles? Dann findest Du
                bei Satellytes neue Herausforderungen und erfahrene Kollegen,
                mit denen Du weiter wachsen kannst. Schaue Dir unsere offenen
                Stellen an. Wir freuen uns auf Deine Bewerbung.
              </Text>
            </HomePageBlockTeaser>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default IndexPage;
