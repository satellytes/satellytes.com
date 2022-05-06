import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { BlogArticleQueryData } from '../../../templates/blog-post';
import { BreadcrumbEntry } from '../../../types';
import { BlogHeader } from '../../content/blog-header/blog-header';
import { BlogHero } from '../../content/heroes/blog-hero';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { Layout } from '../../layout/layout';
import { up } from '../../support/breakpoint';
import FollowPanel from './follow-panel';
import SharePanel from './share-panel';
import { ContentfulRichText } from '../../content/rich-text/rich-text';

interface BlogPostPageProps {
  blogPost: BlogArticleQueryData;
  breadcrumb: BreadcrumbEntry[];
}

const PanelContainer = styled.div`
  display: block;
  margin-top: 80px;

  ${up('md')} {
    display: flex;
    justify-content: space-between;
  }
`;

export const BlogPostPage = ({ blogPost, breadcrumb }: BlogPostPageProps) => {
  const { t } = useTranslation();
  const dateFormatter = useLocaleFormat(LONG_DATE_FORMAT);

  const leadbox: LeadboxProps = {
    title: blogPost.leadBoxText ?? t('blogpost.leadbox.title'),
    illustration: 'astronaut_012',
    link: {
      title: t('blogpost.leadbox.link'),
      href: '/career/',
    },
  };

  const formattedDate = dateFormatter(blogPost.publicationDate);

  const readingTime = `${Math.ceil(blogPost.readingTime.minutes)}min read`;
  const byLine = `${blogPost.author.fullName} ${
    blogPost.author.summary ? `(${blogPost.author.summary})` : ''
  }`;
  const heroByLine = `${formattedDate} • ${readingTime} • ${byLine}`;

  // todo: put this variable into Contentful
  const heroNaturalHeight =
    blogPost.id === 'e154c38b-4dfe-5e9b-81ea-9df1c852bb07' ||
    blogPost.id === '0a0945c4-f5f8-5734-b44e-b6c193ceeee1' ||
    blogPost.id === 'ca5d5e82-481f-5f6b-acc0-004e567d76c4' ||
    blogPost.id === 'a60c3422-ba69-5bc2-8da0-5833de3dca39';

  return (
    <Layout
      transparentHeader
      siteTitleUrl={'/blog'}
      light
      hero={
        <BlogHero
          attribution={blogPost.heroImage}
          image={blogPost.heroImage.fullImage}
          naturalHeight={heroNaturalHeight}
        />
      }
      leadbox={leadbox}
      showLanguageSwitch={false}
      breadcrumb={breadcrumb}
    >
      <article>
        <BlogHeader headline={blogPost.title} byline={heroByLine}>
          {blogPost.introText?.introText}
        </BlogHeader>

        <ContentfulRichText data={blogPost.content} />

        <PanelContainer>
          <SharePanel title={blogPost.title} />
          <FollowPanel />
        </PanelContainer>
      </article>
    </Layout>
  );
};
