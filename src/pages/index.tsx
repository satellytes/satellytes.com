import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

import { Grid } from '../components/grid/grid';
import SEO from '../components/seo';
import { LayoutV2 } from '../components/layout/layout-v2';
import { Aurora } from '../components/aurora/aurora';
import { TextStyles } from '../components/typography/typography-v2';
import { HeaderBlock } from '../components/header-block/header-block';
import { Teaser } from '../components/teasers/teaser';
import {
  Illustration,
  IllustrationSize,
} from '../components/illustration/illustration';
import { TeaserGrid } from '../components/teasers/grid/teaser-grid';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { PageContainer } from '../components/layout/page-container';

interface AllClientsQuery {
  nodes: {
    start: string;
    name: string;
    nameEN: string;
    path: string;
  }[];
}

const HeroPageContainer = styled(PageContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding-top: 285px;
  padding-bottom: 48px;

  color: #ffffff;

  ${up('md')} {
    padding-top: 357px;
    padding-bottom: 108px;
  }
`;

const IndexPageTitle = styled.h1`
  ${TextStyles.headlineXL};

  margin-top: 0;
  margin-bottom: 32px;
`;

const IndexPageSubTitle = styled.h2`
  ${TextStyles.textL};

  margin-top: 0;
  font-weight: 400;
  max-width: 640px;
`;

const HomePageHeaderBlock = styled(HeaderBlock)`
  margin-bottom: 80px;
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
  location: Location;
}

const IndexPage = ({ location }: IndexPageProps) => {
  return (
    <>
      <SEO title="Satellytes" location={location} />
      <LayoutV2
        transparentHeader={true}
        light={true}
        hero={
          <>
            <Aurora />
            <HeroPageContainer>
              <IndexPageTitle>Satellytes</IndexPageTitle>
              <IndexPageSubTitle as="h2">
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
              </IndexPageSubTitle>
            </HeroPageContainer>
          </>
        }
      >
        <PageContainer>
          <ContentBlockContainer>
            <HomePageHeaderBlock
              topline="Unsere Services"
              headline="Development & Design"
              large={true}
            >
              <>
                Wir haben großen Spaß an Technologie und freuen uns auf neue
                Herausforderungen. Dabei fokussieren wir uns auf langfristige
                Engagements im Konzerngeschäft. <br />
                Neuen Aufgaben begegnen wir immer mit angemessenem Respekt. Wir
                streben stets hochwertige und zeitgemäße Lösungen an – die Wahl
                der Technologie ist für uns dabei sekundär. Gern unterstützen
                wir auch Sie in den folgenden Disziplinen:
              </>
            </HomePageHeaderBlock>
          </ContentBlockContainer>
          <TeaserGrid>
            <Teaser
              title="Enterprise Applikationen & Libraries"
              linkTo="/clients"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              Teams aus Designern, Produktmanagern, Entwicklern,
              Supportmitarbeitern, Marketingspezialisten usw. bringen die
              richtige Mischung aus Know-how und Erfahrung mit und sorgen dafür,
              dass auch mal über den Tellerrand geschaut wird.
            </Teaser>
            <Teaser
              title="Technische Analyse"
              linkTo="/clients"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              Jedes Team bei Satellytes ist für seine eigenen Aufgaben
              verantwortlich. In den Worten des Agilen Manifests: „Die besten
              Architekturen, Anforderungen und Entwürfe entstehen durch
              selbstorganisierte Teams.“
            </Teaser>
            <Teaser
              title="UX/UI"
              linkTo="/clients"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              Schnelles Feedback, kurze Entscheidungswege und Offenheit für
              Veränderung sind uns wichtig – egal, ob man es Scrum, Kanban oder
              XP nennt.
            </Teaser>
          </TeaserGrid>
          <ContentBlockContainer>
            <HomePageHeaderBlock
              topline="Unsere Kunden"
              headline="Kundenbeziehungen statt Kundenprojekte"
              large={true}
            >
              Wir unterstützen große Konzerne bei der Umsetzung ihrer digitalen
              Strategien. Finden Sie heraus für welche Kunden & Branchen wir
              tätig sind. Integer posuere erat a ante venenatis dapibus posuere
              velit aliquet. Morbi leo risus, porta ac consectetur ac,
              vestibulum at eros. Maecenas sed diam eget risus varius blandit
              sit amet non magna.
            </HomePageHeaderBlock>

            <TeaserGrid>
              <Teaser title="Versicherung" linkTo="/clients">
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
              </Teaser>
              <Teaser title="Sportverein" linkTo="/clients">
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
              </Teaser>
              <Teaser title="Bank" linkTo="/clients">
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
              </Teaser>
              <Teaser title="Automobilclub" linkTo="/clients">
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
              </Teaser>
            </TeaserGrid>
          </ContentBlockContainer>
          <ContentBlockContainer>
            <HomePageHeaderBlock
              topline="Karriere bei Satellytes"
              headline="Arbeite mit uns"
              large={true}
            >
              Wir suchen Entwickler:innen aus Leidenschaft! Du hast noch nicht
              viel Berufserfahrung? Kein Problem. Denn alles, was du wissen
              musst, lernst Du bei uns. Du kannst schon alles? Dann findest Du
              bei Satellytes neue Herausforderungen und erfahrene Kollegen, mit
              denen Du weiter wachsen kannst. Schaue Dir unsere offenen Stellen
              an. Wir freuen uns auf Deine Bewerbung.
            </HomePageHeaderBlock>
            <TeaserGrid>
              <Teaser title="Frontend Engineer" linkTo="/clients">
                Wir suchen eine:n Frontend Engineer (w/m/x) mit erster
                professioneller Erfahrung als Webentwickler:in. Werde Teil eines
                Teams, bei dem du von Experten den Umgang mit Frameworks &
                Testing ausbauen und verfeinern kannst.
              </Teaser>
              <Teaser title="Senior Backend Engineer" linkTo="/clients">
                Dir sind Spring Boot, Jenkins, Kubernetes keine Fremdwörter?
                Java ist keine Fremdsprache für dich? Du hast Lust auf
                anspruchsvolle, komplexe Backend-Projekte mit eigenständigen
                Aufgaben und Entscheidungen im Team?
              </Teaser>
              <Teaser title="Senior Frontend Engineer" linkTo="/clients">
                Wir suchen einen &quot;Senior Frontend Engineer (m/w/x)&quot;
                für unser Office in München. Du wirst Teil eines erfahrenen
                Frontend-Teams, um moderne Web-Applikationen und Bibliotheken
                basierend auf React oder Angular umzusetzen.
              </Teaser>
            </TeaserGrid>
          </ContentBlockContainer>
        </PageContainer>
      </LayoutV2>
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
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
        nameEN
        path
        start
      }
    }
  }
`;
