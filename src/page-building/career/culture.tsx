import React from 'react';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { Teaser } from '../../components/teasers/teaser';
import { Illustration } from '../../components/illustration/illustration';
import { IllustrationType } from '../../components/illustration/illustration-set';
import { SectionHeader } from '../../new-components/section-header/section-header';

interface CultureAspect {
  illustration: IllustrationType;
  title: string;
  description: string;
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

const ASPECTS: CultureAspect[] = [
  {
    title: 'Cross-Functional',
    description:
      'Teams aus Designern, Produktmanagern, Entwicklern, Supportmitarbeitern, Marketingspezialisten usw. bringen die richtige Mischung aus Know-how und Erfahrung mit und sorgen dafür, dass auch mal über den Tellerrand geschaut wird.',
    illustration: 'radar_030',
  },

  {
    title: 'Self-Organisation',
    description:
      'Jedes Team bei Satellytes ist für seine eigenen Aufgaben verantwortlich. In den Worten des Agilen Manifests: „Die besten Architekturen, Anforderungen und Entwürfe entstehen durch selbstorganisierte Teams.“',
    illustration: 'rocket_011',
  },

  {
    title: 'Agile',
    description:
      'Schnelles Feedback, kurze Entscheidungswege und Offenheit für Veränderung sind uns wichtig – egal, ob man es Scrum, Kanban oder XP nennt.',
    illustration: 'sputnik_045',
  },

  {
    title: 'Erfolgreich scheitern',
    description:
      'Wenn wir etwas Neues ausprobieren, riskieren wir immer auch einen Misserfolg. Macht nichts – aus Fehlern lernen, Erkenntnisse mit anderen teilen und im nächsten Projekt in Erfolge ummünzen.',
    illustration: 'planets_005',
  },

  {
    title: 'Feedback',
    description:
      'Zusammenarbeit ist bei uns nicht nur ein Wort: Code-Review, Inline-Kommentare, Pair Programming, tägliche Stand-up-Meetings, 360-Grad-Feedback usw.',
    illustration: 'report_031',
  },
  {
    title: 'Open Work',
    description:
      'Offen sein, zuhören, andere Meinungen respektieren und gemeinsam die besten Lösungen finden.',
    illustration: 'book_038',
  },
];

const CultureTeaserGrid = styled(TeaserGrid)`
  margin-top: 48px;
`;

export const Culture = () => {
  return (
    <>
      <SectionHeader kicker="Team" headline="Spass an der Arbeit">
        Wir möchten die Voraussetzung schaffen, damit sich jeder persönlich wie
        beruflich weiterentwickeln kann.
      </SectionHeader>

      <CultureTeaserGrid>
        {ASPECTS.map((item, index) => (
          <Teaser
            title={item.title}
            key={index}
            cover={<Illustration show={item.illustration} />}
          >
            {item.description}
          </Teaser>
        ))}
      </CultureTeaserGrid>
    </>
  );
};
