import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { IllustrationSize } from '../../ui/illustration/illustration';
import { up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';
import { IllustrationStyled, IntroLayout } from './support';

interface IndustriesProps {
  className?: string;
}

const HeadlineStyled = styled.h2`
  ${TextStyles.headlineL}
  margin: 0;
  color: #202840;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
    ${TextStyles.headlineXL}
  }
`;

const ContentStyled = styled.div`
  ${TextStyles.textR}

  ${up('md')} {
    ${TextStyles.textL}
  }
`;

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
      <IntroLayout>
        <IllustrationStyled size={IllustrationSize.LARGE} show={'report_031'} />
        <div>
          <HeadlineStyled>{t('services.industries.title')}</HeadlineStyled>
          <ContentStyled>{t('services.industries.text')}</ContentStyled>
        </div>
      </IntroLayout>

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
