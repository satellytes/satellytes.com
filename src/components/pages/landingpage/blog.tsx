import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { BlogPostTeaser } from '../../../types';
import styled from 'styled-components';
import { Button } from '../../ui/buttons/button';

interface BlogProps {
  posts: BlogPostTeaser[];
}

const Spacer = styled.div`
  height: 40px;
`;

export const Blog = ({ posts }: BlogProps) => {
  const { t } = useTranslation();
  const dateFormatter = useLocaleFormat(LONG_DATE_FORMAT);

  return (
    <>
      <HomePageHeaderBlock
        topline={t('main.blog.kicker')}
        headline={t('main.blog.title')}
        large={true}
      >
        {t('main.blog.text')}
      </HomePageHeaderBlock>

      <TeaserGrid>
        {posts.map((item) => {
          const imageData = getImage(item.heroImage.image);

          return (
            <Teaser
              key={item.id}
              title={item.title}
              linkTo={`blog/${item.slug}`}
              language={'en'}
              dateFormatted={dateFormatter(item.publicationDate)}
              image={imageData && <GatsbyImage alt="" image={imageData} />}
            >
              {item.teaserText}
            </Teaser>
          );
        })}
      </TeaserGrid>

      <Spacer />
      <Button to={'/blog'}>{t('main.blog.button')}</Button>
    </>
  );
};
