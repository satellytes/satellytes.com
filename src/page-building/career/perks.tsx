import React from 'react';
import styled from 'styled-components';
import { Teaser } from '../../new-components/teaser/teaser';
import { up } from '../../components/style-utils/breakpoint';
import { IllustrationType } from '../../components/illustration/illustration-set';
import { SectionHeader } from '../../new-components/section-header/section-header';

interface Perk {
  illustration: IllustrationType;
}

const TeaserGrid = styled.div`
  display: grid;
  gap: 24px;

  justify-items: stretch;
  grid-template-columns: repeat(auto-fit, 250px);
  ${up('md')} {
    gap: 70px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

interface Perk {
  illustration: IllustrationType;
  title: string;
  description: string;
}

const PERKS: Perk[] = [
  {
    title: 'Zeit für Experimente',
    description:
      'Bei uns bekommst du Raum, um neue Technologien auszuprobieren oder mit Kollegen kleine Experimente durchzuführen',
    illustration: 'scientistA_006',
  },

  {
    title: 'Lebenslanges Lernen',
    description:
      'Du wirst bei uns jeden Tag etwas lernen, egal ob du dich als Anfänger oder Profi siehst. Sollte dir selbst mal die Muse fehlen, dann wird ein Kollege dich sicherlich kurz später zu inspirieren wissen. Und wenn du mal ein Buch brauchst: Jedes Buch geht auf uns.',
    illustration: 'universe_003',
  },

  {
    title: 'Lieblingsausrüstung',
    description:
      'Ob MacBook oder Linux Laptop? Ob Maus oder Trackpad oder VSCode oder IntelliJ. Du hast bei uns die Wahl.',
    illustration: 'monitor_024',
  },

  {
    title: 'Arbeiten wo du willst',
    description:
      'Arbeitszeit und Arbeitsort kannst du nach Absprache mit dem Team & Kunden flexibel wählen.',
    illustration: 'galaxy_013',
  },

  {
    title: 'Konferenzen',
    description:
      'Wir lieben Tech-Konferenzen und sind schon oft Besucher und manchmal sogar Speaker gewesen. Wir zahlen dir Ticket, Kost und Logis. Willst du Speaker werden? Wir unterstützen dich dabei.',
    illustration: 'planetarium_028',
  },
];

const PerksTeaserGrid = styled(TeaserGrid)`
  margin-top: 48px;
`;

export const Perks = () => {
  return (
    <>
      <SectionHeader kicker="Arbeiten" headline=" Perks & Benefits  ">
        Neben einem großartigen Team, interessanten Aufgaben und einer modernen
        Arbeitsumgebung bieten wir noch weitere Extras.
      </SectionHeader>

      <PerksTeaserGrid>
        {PERKS.map((item, index) => (
          <Teaser
            title={item.title}
            key={index}
            illustration={item.illustration}
          >
            {item.description}
          </Teaser>
        ))}
      </PerksTeaserGrid>
    </>
  );
};
