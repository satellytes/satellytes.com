import React from 'react';
import {
  StyledTabList,
  StyledTabs,
  StyledTabPanels,
  StyledTab,
  StyledTabPanel,
} from './tabs';

const ServicesTabs: React.FC = () => {
  return (
    <StyledTabs defaultIndex={0}>
      <StyledTabList id="tabList">
        <StyledTab>UX/UI</StyledTab>
        <StyledTab>Full Stack</StyledTab>
        <StyledTab>Service Development</StyledTab>
        <StyledTab>More</StyledTab>
      </StyledTabList>

      <StyledTabPanels>
        <StyledTabPanel>
          <p>
            Mit rund 20 Jahren Erfahrung in der Konzeption und Umsetzung
            digitaler Interfaces kennen und können wir das gesamte Spektrum der
            User Experience (UX). Der kleine, sichtbare Teil davon ist das User
            Interface (UI), der große unsichtbare (UX) jedoch viel relevanter
            für die Erreichung ihrer wirtschaftlichen Ziele. Denn nur mit
            benutzerfreundlichen, leicht verständlichen Journeys über alle
            Endgeräte, Nutzergruppen und Nutzungskontexte hinweg, erreichen die
            User und somit Sie ihr Ziel.
          </p>
          <ul>
            <li>Informationsarchitektur (und Navigation)</li>
            <li>
              Information/Content Design (Readability, Scanability, Consistency,
              Density, Sizes)
            </li>
            <li>User Interface Design (Atomic Design, Pattern Libraries)</li>
            <li>Interaction Design (Clarity, Ergonomy, Ease/Joy of Use)</li>
            <li>Brand Experience</li>
            <li>Accessibility (WAI)</li>
            <li>Loading, Responsive-Strategien, Performance</li>
          </ul>
        </StyledTabPanel>
        <StyledTabPanel>
          <p>
            Angular, React, Vue, Node, Polymer, WebComponent, Redux, Atomic
            Design... - die Liste der Buzzwords nimmt kein Ende. Ständig tauchen
            neue Bibliotheken auf, die es sich zum Ziel gesetzt haben das
            Internet (zumindest teilweise) zu revolutionieren und somit sowohl
            Betrachtern als auch Entwicklern das Leben zu erleichtern. Viele
            dieser neuen Technologien verbinden ähnliche grundlegende Konzepte
            wie Modularität und Wiederverwendbarkeit, womit sich die zur
            Verfügung gestellten Instrumente der unterschiedlichen Technologien
            einander durchaus ähneln. Umso wichtiger ist es für uns den
            Überblick zu behalten und die Spreu vom Weizen zu trennen, um für
            Ihr Projekt genau diejenige Architektur wählen zu können, die eben
            jene Instrumente bietet die für Ihr Projekt benötigt werden. Dafür
            haben wir keine Scheu uns mit dem Modernsten des Modernen
            auseinanderzusetzen, ohne dabei die Produktionsreife eines
            Frameworks aus den Augen zu lassen.
          </p>
        </StyledTabPanel>
        <StyledTabPanel>
          <p>
            Oft versuchen Unternehmen ihre analogen Services eins zu eins zu
            digitalisieren. Oder sie orientieren sich am Wettbewerb und wollen
            alles was die anderen auch haben – nur um auf Nummer sicher zu
            gehen. Vielleicht ist das aber gar nicht das was ihre Nutzer wollen?
            Wir gehen gerne mit Ihnen den Weg ab dem ersten Schritt und
            erarbeiten Services, die zu Ihren KPIs und Kunden passen.
          </p>
        </StyledTabPanel>
        <StyledTabPanel>
          <p>And more...</p>
        </StyledTabPanel>
      </StyledTabPanels>
    </StyledTabs>
  );
};

export default ServicesTabs;
