import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  PageTitle,
  CaptionText,
  LargeText,
  SubTitle,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import ServicesTabs from '../components/tabs/services-tabs';

export const servicesTabsData = [
  {
    title: 'UX/UI',
    content:
      'Mit rund 20 Jahren Erfahrung in der Konzeption und Umsetzung digitaler Interfaces kennen und können wir das gesamte Spektrum der User Experience (UX). Der kleine, sichtbare Teil davon ist das User Interface (UI), der große unsichtbare (UX) jedoch viel relevanter für die Erreichung ihrer wirtschaftlichen Ziele. Denn nur mit benutzerfreundlichen, leicht verständlichen Journeys über alle Endgeräte, Nutzergruppen und Nutzungskontexte hinweg, erreichen die User und somit Sie ihr Ziel.  \n\n * Informationsarchitektur (und Navigation)\n\n * Information/Content Design (Readability, Scanability, Consistency, Density, Sizes)\n\n * User Interface Design (Atomic Design, Pattern Libraries)\n\n * Interaction Design (Clarity, Ergonomy, Ease/Joy of Use)\n\n * Brand Experience\n\n * Accessibility (WAI)\n\n * Loading, Responsive-Strategien, Performance',
  },
  {
    title: 'Full Stack',
    content:
      'Angular, React, Vue, Node, Polymer, WebComponent, Redux, Atomic Design... - die Liste der Buzzwords nimmt kein Ende. Ständig tauchen neue Bibliotheken auf, die es sich zum Ziel gesetzt haben das Internet (zumindest teilweise) zu revolutionieren und somit sowohl Betrachtern als auch Entwicklern das Leben zu erleichtern. Viele dieser neuen Technologien verbinden ähnliche grundlegende Konzepte wie Modularität und Wiederverwendbarkeit, womit sich die zur Verfügung gestellten Instrumente der unterschiedlichen Technologien einander durchaus ähneln. Umso wichtiger ist es für uns den Überblick zu behalten und die Spreu vom Weizen zu trennen, um für Ihr Projekt genau diejenige Architektur wählen zu können, die eben jene Instrumente bietet die für Ihr Projekt benötigt werden. Dafür haben wir keine Scheu uns mit dem Modernsten des Modernen auseinanderzusetzen, ohne dabei die Produktionsreife eines Frameworks aus den Augen zu lassen.',
  },
  {
    title: 'Service Development',
    content:
      'Oft versuchen Unternehmen ihre analogen Services eins zu eins zu digitalisieren. Oder sie orientieren sich am Wettbewerb und wollen alles was die anderen auch haben – nur um auf Nummer sicher zu gehen. Vielleicht ist das aber gar nicht das was ihre Nutzer wollen? Wir gehen gerne mit Ihnen den Weg ab dem ersten Schritt und erarbeiten Services, die zu Ihren KPIs und Kunden passen.',
  },
  { title: 'More', content: 'And more...' },
];

const ServicesSectionTitle = styled(SubTitle)`
  margin-top: 80px;

  ${up('md')} {
    margin-top: 160px;
  }
`;

const OthersCaptionText = styled(CaptionText)`
  margin-top: -16px;
  margin-bottom: 32px;

  ${up('md')} {
    margin-top: -24px;
    margin-bottom: 40px;
  }
`;

/* with the default GridItem, at mobile width, the Tab component overflows and stretches the page on firefox (but not chrome..). 
this overrides that behaviour. */
const StyledGridItem = styled(GridItem)`
  min-width: 0;
  min-height: 0;
`;

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Services" />
      <Grid>
        <GridItem>
          <PageTitle>Services</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <LargeText>
            We are not doing wordpress websites fire and forget style, but
            enterprise size projects, with a state of the interface and tech
            stack.
          </LargeText>
          <LargeText>
            We are really good at creating design systems for complex web
            applications and self-testing, high performance pattern libraries.
          </LargeText>
          <CaptionText>
            By the way: That’s what we also do with our employees. Apply
          </CaptionText>
          <ServicesSectionTitle>
            Here is a list of stuff we are really good at:
          </ServicesSectionTitle>
        </GridItem>
        <StyledGridItem xs={12} md={8}>
          <ServicesTabs tabs={servicesTabsData} />
        </StyledGridItem>
        <GridItem xs={12} md={8}>
          <ServicesSectionTitle>
            And that’s where others are way better:
          </ServicesSectionTitle>
          <LargeText>
            Marketing, Texting, Photoshopping, Illustrating just to name a few
            ...
          </LargeText>
          <OthersCaptionText>
            but boy are we good at networking and collaborating. We can get the
            right people for you into the team.
          </OthersCaptionText>
          <div>TODO: ImageGrid</div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ServicesPage;
