import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { ClientList } from '../components/client-list/client-list';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Image as CloudinaryImage } from 'cloudinary-react';
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
        alt=""
      />
      <Layout isIndexPage={true}>
        <SEO title="Home" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitle>Willkommen bei Satellytes</HomePageTitle>
            <HomePageBlockTeaser
              margin
              preTitle="Leistungen"
              title="Das bieten wir"
              link="Zu den Leistungen >"
              linkTo="/services"
            >
              <Text>
                Satellytes – das sind ausschließlich leidenschaftliche
                Entwickler und Designer. Wir haben großen Spaß an Technologie
                und freuen uns auf neue Herausforderungen. Dabei fokussieren wir
                uns auf langfristige Engagements im Konzerngeschäft.
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
                Wir unterstützen große Konzerne bei der Umsetzung ihrer
                digitalen Strategien. Finden Sie heraus für welche Kunden &
                Branchen wir tätig sind.
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
              link="Zur Karriere-Seite >"
              linkTo="/career"
            >
              <Text>
                Wir suchen Entwickler aus Leidenschaft! Du hast noch nicht viel
                Berufserfahrung? Kein Problem. Denn alles, was du wissen musst,
                lernst Du bei uns. Du kannst schon alles? Dann findest Du bei
                Satellytes neue Herausforderungen und erfahrene Kollegen, mit
                denen Du weiter wachsen kannst. Schaue Dir unsere offenen
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
