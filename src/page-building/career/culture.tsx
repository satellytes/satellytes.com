import React from 'react';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { Teaser } from '../../components/teasers/teaser';
import { Illustration } from '../../components/illustration/illustration';
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
  'radar_030',
  'rocket_011',
  'sputnik_045',
  'planets_005',
  'report_031',
  'book_038',
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
        {ILLUSTRATIONS.map((illustration, index) => (
          <Teaser
            title={t(`career.culture.teaser.${index}.title`)}
            key={index}
            cover={<Illustration show={illustration} />}
          >
            {t(`career.culture.teaser.${index}.description`)}
          </Teaser>
        ))}
      </CultureTeaserGrid>
    </>
  );
};
