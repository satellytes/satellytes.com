import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { ClientList } from '../components/client-list/client-list';
import {
  Grid,
  GRID_GAP_DESKTOP,
  GRID_GAP_MOBILE,
  GridItem,
} from '../components/grid/grid';
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
  height: 92vh;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: calc(96px + ${HEADER_HEIGHT});

  ${up('md')} {
    height: 100vh;
    padding-top: calc(192px + ${HEADER_HEIGHT});
  }

  color: #ffffff;

  ${TitleSvg} {
    left: 2px;
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

const BackgroundImage = styled(CloudinaryImage)`
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: bottom;
  z-index: -1;
`;

const ImageCopyright = styled.div`
  position: absolute;
  right: ${() => GRID_GAP_MOBILE};
  // bottom = 100vh - HomePageTitle vh + GAP
  bottom: ${() => `calc(8vh + ${GRID_GAP_MOBILE})`};
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 12px;
  opacity: 0.6;

  ${up('md')} {
    right: ${() => GRID_GAP_DESKTOP};
    bottom: ${() => GRID_GAP_DESKTOP};
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
    <>
      <BackgroundImage
        responsive
        secure
        cloudName="satellytes"
        publicId="satellytes-website/SY-Image_tmjwss.png"
        format="webp"
        alt=""
        width="auto"
      >
        <Placeholder type="blur" />
      </BackgroundImage>
      <Layout isIndexPage={true}>
        <SEO title="Satellytes" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitle>
              Satellytes Enterprise Web Applications
            </HomePageTitle>
            <ImageCopyright>Photo by Riyanthi Sianturi</ImageCopyright>
          </GridItem>
          <GridItem xs={0} md={2} />
          <GridItem xs={0} md={1} />
          <GridItem xs={12} md={10}>
            <HomePageBlockTeaser
              margin
              preTitle="Leistungen"
              title="Das bieten wir"
              link="Zu den Leistungen >"
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
              link="Zur Karriere-Seite >"
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
