import { Teaser } from '../../components/teasers/teaser';
import { Intro } from './support';
import React from 'react';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface IndustriesProps {
  className?: string;
}

const TeaserContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin-top: 40px;
`;

const TeaserHighlighted = styled(Teaser)`
  grid-column: 1/-1;
`;
export const Industries = ({ className }: IndustriesProps) => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer className={className}>
      <Intro
        illustration="report_031"
        headline={t('services.industries.title')}
      >
        {t('services.industries.text')}
      </Intro>

      <TeaserContainer>
        <Teaser title={t('services.industries.insurance.title')}>
          {t('services.industries.insurance.text')}
        </Teaser>
        <Teaser title={t('services.industries.bank.title')}>
          {t('services.industries.bank.text')}
        </Teaser>
        <Teaser title={t('services.industries.automotive.title')}>
          {t('services.industries.automotive.text')}
        </Teaser>
        <Teaser title={t('services.industries.sport.title')}>
          {t('services.industries.sport.text')}
        </Teaser>
        <TeaserHighlighted title={t('services.industries.you.title')}>
          {t('services.industries.you.text')}
        </TeaserHighlighted>
      </TeaserContainer>
    </ContentBlockContainer>
  );
};
