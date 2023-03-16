import React from 'react';
import styled from 'styled-components';
import { Teaser } from '../../content/teaser/teaser';
import { up } from '../../support/breakpoint';
import { IllustrationType } from '../../ui/illustration/illustration-set';
import { SectionHeader } from '../../content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerTeaserGrid } from './career-teaser-grid';

interface Perk {
  illustration: IllustrationType;
  title: string;
  description: string;
}

const PERKS = (t): Perk[] => [
  {
    title: t('career.perk.teaser.0.title'),
    description: t('career.perk.teaser.0.description'),
    illustration: 'bicycle_052',
  },

  {
    title: t('career.perk.teaser.1.title'),
    description: t('career.perk.teaser.1.description'),
    illustration: 'galaxy_013',
  },

  {
    title: t('career.perk.teaser.2.title'),
    description: t('career.perk.teaser.2.description'),
    illustration: 'planetarium_028',
  },

  {
    title: t('career.perk.teaser.3.title'),
    description: t('career.perk.teaser.3.description'),
    illustration: 'solar_system_040',
  },

  {
    title: t('career.perk.teaser.4.title'),
    description: t('career.perk.teaser.4.description'),
    illustration: 'universe_003',
  },

  {
    title: t('career.perk.teaser.5.title'),
    description: t('career.perk.teaser.5.description'),
    illustration: 'equipment_058',
  },

  {
    title: t('career.perk.teaser.6.title'),
    description: t('career.perk.teaser.6.description'),
    illustration: 'flag_041',
  },

  {
    title: t('career.perk.teaser.7.title'),
    description: t('career.perk.teaser.7.description'),
    illustration: 'scientistA_006',
  },
];

const PerksTeaserGrid = styled(CareerTeaserGrid)`
  margin-top: 48px;

  ${up('md')} {
    margin-top: 60px;
  }
`;

export const Perks = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        kicker={t<string>('career.perk.kicker')}
        headline={t<string>('career.perk.headline')}
      >
        {t('career.perk.paragraph')}
      </SectionHeader>

      <PerksTeaserGrid>
        {PERKS(t).map((item, index) => (
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
