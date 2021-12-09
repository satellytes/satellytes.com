import React from 'react';
import styled from 'styled-components';
import { Teaser } from '../../components/teasers/teaser';
import { Illustration } from '../../components/illustration/illustration';
import { up } from '../../components/style-utils/breakpoint';
import { IllustrationType } from '../../components/illustration/illustration-set';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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

const ILLUSTRATIONS: IllustrationType[] = [
  'scientistA_006',
  'universe_003',
  'monitor_024',
  'galaxy_013',
  'planetarium_028',
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
        {ILLUSTRATIONS.map((illustration, index) => (
          <Teaser
            title={t(`career.perk.teaser.${index}.title`)}
            key={index}
            cover={<Illustration show={illustration} />}
          >
            {t(`career.perk.teaser.${index}.description`)}
          </Teaser>
        ))}
      </PerksTeaserGrid>
    </>
  );
};
