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
import { BlockTeaser } from '../components/teasers/block-teaser';
import {
  PageTitle,
  StyledTitle,
  Text,
  PageTitleSwoosh,
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

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: bottom;
  z-index: -1;
  background-image: url('https://res.cloudinary.com/satellytes/image/upload/w_1280/e_blur:1000,q_1,f_auto/v1/satellytes-website/SY-Image_tmjwss.webp');
  background-repeat: no-repeat;
  background-size: cover;

  /**
   * props.theme is not available inside this component, as the cloudinary
   * component removes it
   */
  background-color: #202840;
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
        src="https://res.cloudinary.com/satellytes/image/upload/w_1280/e_blur:1000,q_1,f_auto/v1/satellytes-website/SY-Image_tmjwss.webp"
        srcSet={`
          https://res.cloudinary.com/satellytes/image/upload/w_300/v1/satellytes-website/SY-Image_tmjwss.webp 300w, 
          https://res.cloudinary.com/satellytes/image/upload/w_768/v1/satellytes-website/SY-Image_tmjwss.webp 768w, 
          https://res.cloudinary.com/satellytes/image/upload/v1/satellytes-website/SY-Image_tmjwss.webp 1280w
        `}
        alt=""
      />
      <Layout isIndexPage={true}>
        <SEO title="Satellytes Digital Consulting GmbH" />
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
