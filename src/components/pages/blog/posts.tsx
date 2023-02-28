import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { BlogPostTeaser } from '../../../types';
import { Teaser } from '../../content/teaser/teaser';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { up } from '../../support/breakpoint';

const BlogTeaserGrid = styled.div`
  display: grid;
  gap: 48px;

  ${up('md')} {
    gap: 24px;
  }

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
  const dateFormatter = useLocaleFormat(LONG_DATE_FORMAT);

  return (
    <BlogTeaserGrid>
      {posts.map((item) => {
        const imageData = getImage(item.heroImage.image);

        return (
          <Teaser
            as={'h2'}
            key={item.id}
            title={item.title}
            linkTo={item.fields.path}
            dateFormatted={dateFormatter(item.publicationDate)}
            image={imageData && <GatsbyImage alt="" image={imageData} />}
          >
            {item.teaserText}
          </Teaser>
        );
      })}
    </BlogTeaserGrid>
  );
};
