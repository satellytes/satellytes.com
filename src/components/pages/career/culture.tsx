import React from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Teaser } from '../../content/teaser/teaser';
import { IllustrationType } from '../../ui/illustration/illustration-set';
import { SectionHeader } from '../../content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerTeaserGrid } from './career-teaser-grid';

interface CultureAspect {
  illustration: IllustrationType;
  title: string;
  description: string;
}

const ASPECTS = (t): CultureAspect[] => [
  {
    title: t('career.culture.teaser.0.title'),
    description: t('career.culture.teaser.0.description'),
    illustration: 'uranus_050',
  },

  {
    title: t('career.culture.teaser.1.title'),
    description: t('career.culture.teaser.1.description'),
    illustration: 'stars_009',
  },

  {
    title: t('career.culture.teaser.2.title'),
    description: t('career.culture.teaser.2.description'),
    illustration: 'agile_059',
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
    illustration: 'blimp_000',
  },
];

const CultureTeaserGrid = styled(CareerTeaserGrid)`
  margin-top: 48px;
  ${up('md')} {
    margin-top: 60px;
  }
`;

export const Culture = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        kicker={t<string>('career.culture.kicker')}
        headline={t<string>('career.culture.headline')}
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
