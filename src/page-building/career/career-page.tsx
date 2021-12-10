import React from 'react';
import { ApplicationProcess } from './application-process';
import { Openings } from './openings';
import { SectionHeader } from '../../new-components/section-header/section-header';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Aurora } from '../../components/aurora/aurora';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { Culture } from './culture';
import { Perks } from './perks';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SyPersonioJob } from '../../types';

const Paragraph = styled.p`
  ${TextStyles.textR}
  & + & {
    margin-bottom: 16px;
  }
`;

interface CareerPageProps {
  positions: SyPersonioJob[];
}

export const CareerPage = ({ positions }: CareerPageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    title: t('career.leadbox.title'),
    illustration: 'astronaut_012',
    contact: {
      headline: t('career.leadbox.subtitle'),
      title: t('career.leadbox.text'),
      email: t('career.leadbox.mail'),
    },
  };

  return (
    <LayoutV2
      leadbox={leadbox}
      transparentHeader={true}
      light={true}
      hero={<Aurora />}
    >
      <ContentBlockContainer>
        <SectionHeader
          kicker="Karriere bei Satellytes"
          headline="Arbeite mit uns"
        >
          <Paragraph>
            Satellytes – das sind aktuell 14 ausschließlich leidenschaftliche
            Entwickler:innen und Designer:innen. Wir haben großen Spaß an
            Technologie und freuen uns auf neue Herausforderungen. Dabei
            fokussieren wir uns auf langfristige Engagements im Konzerngeschäft.
          </Paragraph>
          <Paragraph>
            Neuen Aufgaben begegnen wir immer mit angemessenem Respekt. Wir
            streben stets hochwertige und zeitgemäße Lösungen an – die Wahl der
            Technologie ist für uns dabei sekundär.
          </Paragraph>
          <Paragraph>
            Unser Büro befindet sich in einem wunderschönen Altbau im Herzen
            Münchens, in der Sendlinger Straße, unweit der gleichnamigen
            U-Bahn-Station. In Laufweite gibt es nicht nur dutzende Läden,
            Cafés, Restaurants und den bekannten Viktualienmarkt, sondern auch
            diverse kleinere und größere Parks. Sogar die Isar ist in der
            Mittagspause fußläufig oder mit der U-Bahn in nur 3 Minuten zu
            erreichen.
          </Paragraph>
        </SectionHeader>
      </ContentBlockContainer>

      <ContentBlockContainer>
        <ApplicationProcess />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Openings jobs={positions} />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Culture />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Culture />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Perks />
      </ContentBlockContainer>
    </LayoutV2>
  );
};
