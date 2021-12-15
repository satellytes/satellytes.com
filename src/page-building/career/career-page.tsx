import React from 'react';
import { ApplicationProcess } from './application-process';
import { Openings } from './openings';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { LayoutV2 } from '../../components/layout/layout';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { Culture } from './culture';
import { Perks } from './perks';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SyPersonioJob } from '../../types';
import { ImageHero } from '../../new-components/heroes';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface CareerPageProps {
  positions: SyPersonioJob[];
  heroImageData: IGatsbyImageData;
}

export const CareerPage = ({ positions, heroImageData }: CareerPageProps) => {
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
      hero={<ImageHero image={heroImageData} />}
    >
      <ContentBlockContainer>
        <SectionHeader
          kicker={t('career.introduction.kicker')}
          headline={t('career.introduction.headline')}
        >
          {t('career.introduction.paragraphs.0')}
        </SectionHeader>
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Openings jobs={positions} />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <ApplicationProcess />
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
