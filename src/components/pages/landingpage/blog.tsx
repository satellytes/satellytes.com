import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { BlogPostTeaser, ContentfulSectionHeader } from '../../../types';
import styled from 'styled-components';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';
import { up } from '../../support/breakpoint';

const StyledLandingPageTeaserGrid = styled(LandingPageTeaserGrid)`
  margin-bottom: 60px;
  grid-auto-columns: 256px;

  ${up('md')} {
    grid-template-columns: repeat(auto-fit, minmax(278px, 1fr));
    gap: 24px;
  }
`;

interface BlogProps {
  posts: BlogPostTeaser[];
  header: ContentfulSectionHeader;
}

export const Blog = ({ posts, header }: BlogProps) => {
  const { t } = useTranslation();
  const dateFormatter = useLocaleFormat(LONG_DATE_FORMAT);

  return (
    <>
      <HomePageHeaderBlock
        topline={header.kicker as string}
        headline={header.headline as string}
        large={true}
      >
        {header.paragraphs?.[0]?.paragraph?.paragraph}
      </HomePageHeaderBlock>

      <StyledLandingPageTeaserGrid>
        {posts.map((item) => {
          const imageData = getImage(item.heroImage.image);

          return (
            <Teaser
              key={item.id}
              title={item.title}
              linkTo={item.fields.path}
              language={'en'}
              dateFormatted={dateFormatter(item.publicationDate)}
              image={imageData && <GatsbyImage alt="" image={imageData} />}
            >
              {item.teaserText}
            </Teaser>
          );
        })}
      </StyledLandingPageTeaserGrid>
      <Button to={'/blog'}>{t('main.blog.button')}</Button>
    </>
  );
};
