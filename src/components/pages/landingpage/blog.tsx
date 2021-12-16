import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useLocaleFormat } from '../../i18n-helpers';
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
  const dateFormatter = useLocaleFormat('dd. MMMM yyyy');

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
          const image = getImage(item.frontmatter.featuredImage)!;

          return (
            <Teaser
              key={item.id}
              title={item.frontmatter.title}
              linkTo={item.frontmatter.path}
              dateFormatted={dateFormatter(item.frontmatter.date)}
              image={image && <GatsbyImage alt="" image={image} />}
            >
              {item.frontmatter.teaserText}
            </Teaser>
          );
        })}
      </TeaserGrid>

      <Spacer />
      <Button to={'/blog'}>Alle Artikel</Button>
    </>
  );
};
