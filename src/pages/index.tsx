import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { ClientList } from '../components/client-list/client-list';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Image as CloudinaryImage, Placeholder } from 'cloudinary-react';
import { BlockTeaser } from '../components/teasers/block-teaser';
import {
  PageTitle,
  StyledTitle,
  Text,
  TitleSvg,
} from '../components/typography/typography';
import { HEADER_HEIGHT } from '../components/header/header';

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
  height: 100vh;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: calc(96px + ${HEADER_HEIGHT});

  ${up('md')} {
    padding-top: calc(192px + ${HEADER_HEIGHT});
  }

  color: #ffffff;

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

const HomePageBlockTeaser = styled(BlockTeaser)<{
  margin?: boolean;
}>`
  margin-bottom: ${(props) => props.margin && '160px'};
`;

const BackgroundImage = styled(CloudinaryImage)`
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
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
      <BackgroundImage
        cloudName="satellytes"
        publicId="satellytes-website/sy-home.png"
        format="webp"
        secure={true}
      />
      <Layout isIndexPage={true}>
        <SEO title="Home" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitle>Willkommen bei Satellytes</HomePageTitle>
            <HomePageBlockTeaser
              margin
              preTitle="Dienstleistungen"
              title="Das bieten wir Ihnen"
              link="Zu den Dienstleistungen >"
              linkTo="/services"
            >
              <Text>
                Satellytes ist eine Digital-Agentur, die um große Unternehmen
                kreist und ihnen bei der Transformation und Optimierung
                digitaler Services und Interfaces hilft. Wir bieten „Full Stack“
                an, also den gesamten Prozess von Ideation bis zur
                Implementierung des letzten performanten Funnels und der letzten
                Zeile wunderschönen Codes.
              </Text>
            </HomePageBlockTeaser>
          </GridItem>
          <GridItem xs={0} md={2} />
          <GridItem xs={0} md={1} />
          <GridItem xs={12} md={10}>
            <HomePageBlockTeaser
              preTitle="Kunden"
              title="Nachhaltige und moderne Projekte"
              splitView
              link="Zu den Kunden >"
              linkTo="/clients"
            >
              <Text>
                Unsere Kunden sind große Konzerne, die wir bei der Umsetzung
                Ihrer digitalen Strategien unterstützen. Die Unternehmen selbst
                sind weithin bekannt und schätzen unsere Diskretion. Deshalb
                verzichten wir an dieser Stelle auf die Nennung konkreter Kunden
                und limitieren uns auf generische Bezeichnungen.
              </Text>
            </HomePageBlockTeaser>
            <ClientList clients={data.allClientsJson.nodes} />
          </GridItem>
          <GridItem xs={0} md={1} />
          <GridItem xs={0} md={1} />
          <GridItem xs={12} md={10}>
            <HomePageBlockTeaser
              preTitle="Karriere"
              title="Arbeite mit uns"
              splitView
              link="Zur Karriere Seite >"
              linkTo="/career"
            >
              <Text>
                Wir suchen Entwickler aus Leidenschaft, den Rest lernst du bei
                uns. Du kannst schon alles? Dann finde bei uns neue
                Herausforderungen und erfahrene Kollegen mit denen du weiter
                wachsen kannst. Schaue dir unsere offenen Stellen an und bewirb
                dich bei uns.
              </Text>
            </HomePageBlockTeaser>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default IndexPage;
