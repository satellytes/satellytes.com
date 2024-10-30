import React from 'react';
import styled from 'styled-components';
import { BlogArticleQueryData } from '../../../templates/blog-post';
import { BreadcrumbEntry, ContentfulLeadBox } from '../../../types';
import { BlogHeader } from '../../content/blog-header/blog-header';
import { BlogHero } from '../../content/heroes/blog-hero';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { Layout } from '../../layout/layout';
import { up } from '../../support/breakpoint';
import FollowPanel from './follow-panel';
import SharePanel from './share-panel';
import { ContentfulRichText } from '../../content/rich-text/rich-text';
import { TextStyles } from '../../typography';

interface BlogPostPageProps {
  blogPost: BlogArticleQueryData;
  breadcrumb: BreadcrumbEntry[];
  contentfulLeadbox: ContentfulLeadBox;
}

const PanelContainer = styled.div`
  display: block;
  margin-top: 80px;

  ${up('md')} {
    display: flex;
    justify-content: space-between;
  }
`;

const RichTextContainer = styled.div`
  > * {
    ${TextStyles.textR}
    ${up('md')} {
      ${TextStyles.textL}
    }
  }
`;

export const BlogPostPage = ({
  blogPost,
  breadcrumb,
  contentfulLeadbox,
}: BlogPostPageProps) => {
  const dateFormatter = useLocaleFormat(LONG_DATE_FORMAT);

  const leadbox: LeadboxProps = {
    title: blogPost.leadBoxText ?? contentfulLeadbox.title,
    illustration: contentfulLeadbox.illustration,
    link: {
      title: contentfulLeadbox.link?.title as string,
      href: contentfulLeadbox.link?.href as string,
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
        {blogPost.introRichText && (
          <RichTextContainer>
            <ContentfulRichText
              data={{
                ...blogPost.introRichText,
                references: [],
              }}
            />
          </RichTextContainer>
        )}
      </BlogHeader>

      <ContentfulRichText data={blogPost.content} />

      <PanelContainer>
        <SharePanel title={blogPost.title} />
        <FollowPanel />
      </PanelContainer>
    </Layout>
  );
};
