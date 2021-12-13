import React from 'react';
import styled from 'styled-components';
import { Teaser } from '../../components/teasers/teaser';
import { Illustration } from '../../components/illustration/illustration';
import { up } from '../../components/style-utils/breakpoint';
import { IllustrationType } from '../../components/illustration/illustration-set';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface Perk {
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

const PERKS = (t): Perk[] => [
  {
    title: t('career.perk.teaser.0.title'),
    description: t('career.perk.teaser.0.description'),
    illustration: 'scientistA_006',
  },

  {
    title: t('career.perk.teaser.1.title'),
    description: t('career.perk.teaser.1.description'),
    illustration: 'universe_003',
  },

  {
    title: t('career.perk.teaser.2.title'),
    description: t('career.perk.teaser.2.description'),
    illustration: 'monitor_024',
  },

  {
    title: t('career.perk.teaser.3.title'),
    description: t('career.perk.teaser.3.description'),
    illustration: 'galaxy_013',
  },

  {
    title: t('career.perk.teaser.4.title'),
    description: t('career.perk.teaser.4.description'),
    illustration: 'planetarium_028',
  },
];

const PerksTeaserGrid = styled(TeaserGrid)`
  margin-top: 48px;
`;

export const Perks = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeader
        kicker={t('career.perk.kicker')}
        headline={t('career.perk.headline')}
      >
        {t('career.perk.paragraph')}
      </SectionHeader>

      <PerksTeaserGrid>
        {PERKS(t).map((item, index) => (
          <Teaser
            title={item.title}
            key={index}
            cover={<Illustration show={item.illustration} />}
          >
            {item.description}
          </Teaser>
        ))}
      </PerksTeaserGrid>
    </>
  );
};
