import { graphql } from 'gatsby';
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
  Text,
  TextTitle,
} from '../components/typography/typography';
import { HEADER_HEIGHT } from '../components/header/header';
import { Aurora, AuroraType } from '../components/aurora/aurora';

interface AllClientsQuery {
  nodes: {
    start: string;
    name: string;
    path: string;
  }[];
}

const HomePageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 92vh;
  min-height: min-content;
  margin: 0;
  padding-top: ${HEADER_HEIGHT};
  color: #ffffff;

  ${up('md')} {
    height: 100vh;
  }
`;

const HomePageBlockTeaser = styled(BlockTeaser)<{
  margin?: boolean;
}>`
  margin-bottom: ${(props) => props.margin && '160px'};
`;

const IndexPageTitle = styled(PageTitle)`
  margin-top: 0;
  margin-bottom: 16px;

  ${up('md')} {
    margin-bottom: 32px;
  }
`;

const IndexPageSubTitle = styled(TextTitle)`
  margin-top: 0;
  font-weight: 400;
`;

export interface LocalesQuery {
  edges: {
    node: {
      ns: string;
      language: string;
      data: string;
    };
  }[];
}

interface IndexPageProps {
  data: {
    locales: LocalesQuery;
    allClientsJson: AllClientsQuery;
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  return (
    <>
      <Aurora type={AuroraType.BrightBlue} />
      <Layout transparentHeader={true}>
        <SEO title="Satellytes" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitleContainer>
              <div>
                <IndexPageTitle>Satellytes</IndexPageTitle>
                <IndexPageSubTitle>
                  We are pragmatic professionals, creating reliable software for
                  the web.
                </IndexPageSubTitle>
              </div>
            </HomePageTitleContainer>
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

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allClientsJson {
      nodes {
        name
        path
        start
      }
    }
  }
`;
