import React from 'react';
import {
  Accordion,
  AccordionSection,
} from '../../components/accordion/accordion';
import { TextStyles } from '../../components/typography/typography-v2';
import styled from 'styled-components';
import { SectionHeader } from '../../new-components/section-header/section-header';

const Spacer = styled.div`
  margin-bottom: 48px;
`;

export const ApplicationProcess = () => {
  return (
    <>
      <SectionHeader headline="Bewerbungsprozess">
        Sich auf einen Job bewerben, das kann oft frustrierend sein. Unser Team
        hat sich deshalb etwas überlegt, was Sinn macht. Schau dir hier unsere
        vier Schritte deiner Bewerbung an.
      </SectionHeader>

      <Spacer />

      <Accordion defaultIndex={0}>
        <AccordionSection
          title="1. Bewerb dich"
          illustration={'scientistB_007'}
        >
          Alles beginnt mit deiner Bewerbung. Schicke uns deinen Lebenslauf und
          ein kleines Anschreiben, wieso du dich gerade bei uns bewirbst. In
          deiner Bewerbung achten wir nicht auf Schulnoten sondern suchen nach
          deiner Leidenschaft fürs Coden. Zeig uns deinen GitHub oder GitLab
          Account. Hast du einen Blog? Dann verweise gerne darauf.
        </AccordionSection>

        <AccordionSection
          title="2. Kennenlernen"
          illustration={'astronaut_015'}
        >
          Wenn wir deine Bewerbung überzeugend finden, laden wir dich zu einem
          ersten Gespräch ein. Hier werden ein oder zwei deiner zukünftigen
          Kollegen mit dir sprechen. Darüber wie du zum Programmieren gekommen
          bist und was dich antreibt. Danach werden werden wir dich besser
          kennen und du kennst die ersten Gesichter hinter Satellytes.
        </AccordionSection>

        <AccordionSection title="3. Technisches Interview">
          Wir machen keine keine Whiteboard Interviews, noch schicken wir die
          irgendwelche Programmieraufgaben. Stattdessen wirst du vorab eine Code
          Review durchführen, die wir dann zusammen im Interview durchsprechen.
          Hier werden sich ganz automatische spannende Gespräch ergeben. Wir
          werden Probleme im Code besprechen und das ein oder andere Fachwissen
          über relevante Technologien ansprechen. Neben der ganzen Technik haben
          wir auch Zeit etwas über unsere Kultur bei Satellytes zu sprechen, um
          sicherzustellen dass du dich bei uns wohl fühlst.
        </AccordionSection>

        <AccordionSection title="4. Entscheidung">
          Du kennst Du hast gezeigt was du kannst und wie du arbeitest. Wir
          haben gezeigt was uns antreibt und wie wir arbeiten. Wenn alles passt
          lassen wir es dir wissen. Passt etwas nicht, dann lassen wir das dich
          ebenfalls wissen.
        </AccordionSection>
      </Accordion>
    </>
  );
};
