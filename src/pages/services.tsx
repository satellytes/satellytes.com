import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import SEO from '../components/seo';
import { LayoutV2 } from '../components/layout/layout-v2';
import { Aurora } from '../components/aurora/aurora';
import { TextStyles } from '../components/typography/typography-v2';
import { HeaderBlock } from '../components/header-block/header-block';
import { SectionHeader } from '../new-components/section-header/section-header';
import { ContentBlockContainer } from '../components/layout/content-block-container';

const HeroContainer = styled.div`
  position: relative;

  margin: 0 auto;
  padding: 437px 24px 48px 24px;

  color: #ffffff;

  ${up('md')} {
    padding: 479px 0 108px 0;

    max-width: 816px;
  }
`;

const ServicesPageTitle = styled.h1`
  ${TextStyles.headlineL};

  ${up('md')} {
    ${TextStyles.headlineXL};
  }
  margin: 0;
`;

interface ServicesPageProps {
  location: Location;
}

const ServicesPage = ({ location }: ServicesPageProps) => {
  return (
    <>
      <SEO title="Satellytes" location={location} />
      <LayoutV2
        transparentHeader={true}
        light={true}
        hero={
          <>
            <Aurora />
            <HeroContainer>
              <ServicesPageTitle>Services</ServicesPageTitle>
            </HeroContainer>
          </>
        }
      >
        <ContentBlockContainer>
          <SectionHeader
            headline={'Development & Design'}
            kicker={'Unsere Services'}
          >
            <p>
              Wir haben großen Spaß an Technologie und freuen uns auf neue
              Herausforderungen. Dabei fokussieren wir uns auf langfristige
              Engagements im Konzerngeschäft.{' '}
            </p>
            <p>
              Neuen Aufgaben begegnen wir immer mit angemessenem Respekt. Wir
              streben stets hochwertige und zeitgemäße Lösungen an – die Wahl
              der Technologie ist für uns dabei sekundär. Gern unterstützen wir
              auch Sie in den folgenden Disziplinen:{' '}
            </p>
          </SectionHeader>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline="Enterprise Applikationen & Libraries"
            illustration="rocket_011"
            large
            topline="Development"
          >
            Wir haben große Erfahrung in der Entwicklung moderner und
            verlässlicher Web-Applikationen für die Versicherungs-, Banken- und
            Automobilbranche. Angular hat sich für derartige Applikationen zur
            Standardtechnologie entwickelt. Wir bringen tiefgreifende Erfahrung
            mit dieser Technologie mit und liefern Ihnen eine maßgeschneiderte
            Lösung zu jedem Problem. Wir sind zudem sehr erfahren in der
            Einführung ganzheitlicher Plattformen –beispielsweise einer
            Infrastruktur aus Angular-Libraries, dem Aufsetzen von
            CI/CD-Pipelines und der Umsetzung gut getesteter Applikationen in
            mehreren Sprachen und Konfigurationen. Zudem sind wir Profis für die
            Entwicklung von Java Backends in allen Variationen. Wir sind
            erfahren in der Anbindung von Bestandssystemen, der Neuentwicklung
            von versionierten APIs und der spezifischen Anbindung von
            Frontend-Applikationen auf Basis von BFF (Backend for Frontend) –
            oder vollkommen dezentralen Microservices. Experten für Projekte in
            Angular & React (wir lieben aber auch Vue & Svelte) UI-Library
            Entwicklung mit Release Management Backend Begleitung mit unseren
            Java und Node-Experten Ihr Ansprechpartner für Inner source Projekte
            & Prozessbegleitung
          </HeaderBlock>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline="Enterprise Applikationen & Libraries"
            illustration="rocket_011"
            large
            topline="Development"
          >
            Wir haben große Erfahrung in der Entwicklung moderner und
            verlässlicher Web-Applikationen für die Versicherungs-, Banken- und
            Automobilbranche. Angular hat sich für derartige Applikationen zur
            Standardtechnologie entwickelt. Wir bringen tiefgreifende Erfahrung
            mit dieser Technologie mit und liefern Ihnen eine maßgeschneiderte
            Lösung zu jedem Problem. Wir sind zudem sehr erfahren in der
            Einführung ganzheitlicher Plattformen –beispielsweise einer
            Infrastruktur aus Angular-Libraries, dem Aufsetzen von
            CI/CD-Pipelines und der Umsetzung gut getesteter Applikationen in
            mehreren Sprachen und Konfigurationen. Zudem sind wir Profis für die
            Entwicklung von Java Backends in allen Variationen. Wir sind
            erfahren in der Anbindung von Bestandssystemen, der Neuentwicklung
            von versionierten APIs und der spezifischen Anbindung von
            Frontend-Applikationen auf Basis von BFF (Backend for Frontend) –
            oder vollkommen dezentralen Microservices. Experten für Projekte in
            Angular & React (wir lieben aber auch Vue & Svelte) UI-Library
            Entwicklung mit Release Management Backend Begleitung mit unseren
            Java und Node-Experten Ihr Ansprechpartner für Inner source Projekte
            & Prozessbegleitung
          </HeaderBlock>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline="Enterprise Applikationen & Libraries"
            illustration="rocket_011"
            large
            topline="Development"
          >
            Wir haben große Erfahrung in der Entwicklung moderner und
            verlässlicher Web-Applikationen für die Versicherungs-, Banken- und
            Automobilbranche. Angular hat sich für derartige Applikationen zur
            Standardtechnologie entwickelt. Wir bringen tiefgreifende Erfahrung
            mit dieser Technologie mit und liefern Ihnen eine maßgeschneiderte
            Lösung zu jedem Problem. Wir sind zudem sehr erfahren in der
            Einführung ganzheitlicher Plattformen –beispielsweise einer
            Infrastruktur aus Angular-Libraries, dem Aufsetzen von
            CI/CD-Pipelines und der Umsetzung gut getesteter Applikationen in
            mehreren Sprachen und Konfigurationen. Zudem sind wir Profis für die
            Entwicklung von Java Backends in allen Variationen. Wir sind
            erfahren in der Anbindung von Bestandssystemen, der Neuentwicklung
            von versionierten APIs und der spezifischen Anbindung von
            Frontend-Applikationen auf Basis von BFF (Backend for Frontend) –
            oder vollkommen dezentralen Microservices. Experten für Projekte in
            Angular & React (wir lieben aber auch Vue & Svelte) UI-Library
            Entwicklung mit Release Management Backend Begleitung mit unseren
            Java und Node-Experten Ihr Ansprechpartner für Inner source Projekte
            & Prozessbegleitung
          </HeaderBlock>
        </ContentBlockContainer>
      </LayoutV2>
    </>
  );
};

export default ServicesPage;

export const ServicesPageQuery = graphql`
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
  }
`;
