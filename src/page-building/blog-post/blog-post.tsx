import React from 'react';
import { Layout } from '../../components/layout/layout';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { MarkdownAst } from '../../components/markdown/markdown-ast';
import SharePanel from '../../components/social-panel/share-panel';
import FollowPanel from '../../components/social-panel/follow-panel';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { BlogPostMarkdown, BreadcrumbEntry } from '../../types';
import { BlogHero } from '../../new-components/heroes/blog-hero';
import { BlogHeader } from '../../new-components/blog-header/blog-header';
import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

interface BlogPostPageProps {
  markdown: BlogPostMarkdown;
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

export const BlogPostPage = ({ markdown, breadcrumb }: BlogPostPageProps) => {
  const { t } = useTranslation();
  const fm = markdown.frontmatter;
  const fields = markdown.fields;

  const { featuredImage, featuredImageSquared, attribution, leadboxText } = fm;
  const leadbox: LeadboxProps = {
    title: leadboxText || t('blogpost.leadbox.title'),
    illustration: 'astronaut_012',
    link: {
      title: t('blogpost.leadbox.link'),
      href: '/career/',
    },
  };

  const dateInWords = formatDistanceToNow(new Date(fm.date), {
    locale: enGB,
    addSuffix: true,
  });

  const readingTime = `${Math.ceil(
    parseInt(fields.readingTime.minutes),
  )}min read`;
  const byLine = `${fm.author} (${fm.authorSummary})`;
  const heroByLine = `${dateInWords} • ${readingTime} • ${byLine}`;

  return (
    <Layout
      transparentHeader
      siteTitleUrl={'/blog'}
      light
      hero={
        <BlogHero
          attribution={attribution}
          image={featuredImage}
          imageSquare={featuredImageSquared}
        />
      }
      leadbox={leadbox}
      showLanguageSwitch={false}
      breadcrumb={breadcrumb}
    >
      <BlogHeader headline={fm.title} byline={heroByLine} />
      <MarkdownAst htmlAst={markdown.htmlAst} />

      <PanelContainer>
        <SharePanel title={fm.title} />
        <FollowPanel />
      </PanelContainer>
    </Layout>
  );
};
