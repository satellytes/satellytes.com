import { useLocaleFormat } from '../../new-components/i18n-helpers';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Teaser } from '../../new-components/teaser/teaser';
import React from 'react';
import styled from 'styled-components';
import { BlogPostTeaser } from '../../types';

const BlogTeaserGrid = styled.div`
  display: grid;
  gap: 24px;
  justify-items: stretch;
  // we fetch teaser of size 600px
  // this means we can search for a column size of 300px - 12px (half gap) = 288px
  // to auto fit our teasers
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
`;

interface PostsProps {
  posts: BlogPostTeaser[];
}

export const Posts = ({ posts }: PostsProps) => {
  const dateFormatter = useLocaleFormat('dd. MMMM yyyy');

  return (
    <BlogTeaserGrid>
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
    </BlogTeaserGrid>
  );
};