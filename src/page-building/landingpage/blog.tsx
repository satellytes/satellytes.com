import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../components/teasers/teaser-grid';
import { Teaser } from '../../components/teasers/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { BlogPostTeaser } from '../../@types/blog';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useLocalFormat } from '../../new-components/i18n-helpers';

interface BlogProps {
  posts: BlogPostTeaser[];
}

export const Blog = ({ posts }: BlogProps) => {
  const { t } = useTranslation();
  const dateFormatter = useLocalFormat('dd. MMMM yyyy');

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
              cover={image && <GatsbyImage alt="" image={image} />}
            >
              {item.frontmatter.teaserText}
            </Teaser>
          );
        })}
      </TeaserGrid>
    </>
  );
};
