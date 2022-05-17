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

  return (
    <Layout
      transparentHeader
      siteTitleUrl={'/blog'}
      light
      contentAs={'article'}
      hero={
        <BlogHero
          attribution={blogPost.heroImage}
          image={blogPost.heroImage.fullImage}
          naturalHeight={blogPost.heroImage.naturalHeight}
        />
      }
      leadbox={leadbox}
      showLanguageSwitch={false}
      breadcrumb={breadcrumb}
    >
      <BlogHeader headline={blogPost.title} byline={heroByLine}>
        {blogPost.introText?.introText}
      </BlogHeader>

      <ContentfulRichText data={blogPost.content} />

      <PanelContainer>
        <SharePanel title={blogPost.title} />
        <FollowPanel />
      </PanelContainer>
    </Layout>
  );
};
