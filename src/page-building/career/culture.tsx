import React from 'react';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { Teaser } from '../../new-components/teaser/teaser';
import { IllustrationType } from '../../new-components/illustration/illustration-set';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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

const ASPECTS = (t): CultureAspect[] => [
  {
    title: t('career.culture.teaser.0.title'),
    description: t('career.culture.teaser.0.description'),
    illustration: 'radar_030',
  },

  {
    title: t('career.culture.teaser.1.title'),
    description: t('career.culture.teaser.1.description'),
    illustration: 'rocket_011',
  },

  {
    title: t('career.culture.teaser.2.title'),
    description: t('career.culture.teaser.2.description'),
    illustration: 'sputnik_045',
  },

  {
    title: t('career.culture.teaser.3.title'),
    description: t('career.culture.teaser.3.description'),
    illustration: 'planets_005',
  },

  {
    title: t('career.culture.teaser.4.title'),
    description: t('career.culture.teaser.4.description'),
    illustration: 'report_031',
  },
  {
    title: t('career.culture.teaser.5.title'),
    description: t('career.culture.teaser.5.description'),
    illustration: 'book_038',
  },
];

const CultureTeaserGrid = styled(TeaserGrid)`
  margin-top: 48px;
`;

export const Culture = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeader
        kicker={t('career.culture.kicker')}
        headline={t('career.culture.headline')}
      >
        {t('career.culture.paragraph')}
      </SectionHeader>

      <CultureTeaserGrid>
        {ASPECTS(t).map((item, index) => (
          <Teaser
            title={item.title}
            key={index}
            illustration={item.illustration}
          >
            {item.description}
          </Teaser>
        ))}
      </CultureTeaserGrid>
    </>
  );
};
