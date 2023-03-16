import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { ContentfulVacancy } from '../../../types';
import styled from 'styled-components';
import { Button } from '../../ui/buttons/button';

interface CareerProps {
  positions: ContentfulVacancy[];
}

const Spacer = styled.div`
  height: 40px;
`;

const textEllipsis = (text, maxLength) => {
  const truncatedText = text.substring(0, maxLength);
  if (truncatedText.length < text.length) {
    return truncatedText + '...';
  }

  return truncatedText;
};

export const Career = ({ positions }: CareerProps) => {
  const { t } = useTranslation();

  return (
    <>
      <HomePageHeaderBlock
        topline={t('main.career.kicker')}
        headline={t('main.career.title')}
        large={true}
      >
        {t('main.career.text')}
      </HomePageHeaderBlock>

      <TeaserGrid>
        {positions.map((item) => (
          <Teaser key={item.id} title={item.name} linkTo={item.slug}>
            {textEllipsis(item.shortDescription.shortDescription, 200)}
          </Teaser>
        ))}
      </TeaserGrid>
      <Spacer />
      <Button to={'/career'}>{t('main.career.button')}</Button>
    </>
  );
};
