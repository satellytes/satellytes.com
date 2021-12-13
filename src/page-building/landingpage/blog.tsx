import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../new-components/teaser/teaser-grid';
import { Teaser } from '../../new-components/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useLocaleFormat } from '../../new-components/i18n-helpers';
import { BlogPostTeaser } from '../../types';
import { LinkButton } from '../../components/links/links';
import styled from 'styled-components';

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
              teaserImage={image && <GatsbyImage alt="" image={image} />}
            >
              {item.frontmatter.teaserText}
            </Teaser>
          );
        })}
      </TeaserGrid>

      <Spacer />
      <LinkButton to={'/blog'}>Alle Artikel</LinkButton>
    </>
  );
};
