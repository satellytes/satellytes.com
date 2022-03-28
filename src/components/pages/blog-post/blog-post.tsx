import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';
import styled from 'styled-components';
import { BlogArticleQueryData } from '../../../templates/blog-post';
import { BreadcrumbEntry } from '../../../types';
import { BlogHeader } from '../../content/blog-header/blog-header';
import { BlogHero } from '../../content/heroes/blog-hero';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { Layout } from '../../layout/layout';
import customComponents from '../../legacy/markdown/custom-components';
import { MarkdownAst } from '../../legacy/markdown/markdown-ast';
import { up } from '../../support/breakpoint';
import FollowPanel from './follow-panel';
import SharePanel from './share-panel';

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

const contentfulRenderOptions: Options = {
  renderMark: {
    [MARKS.CODE]: (text) => <code className="language-text">{text}</code>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (props, children) =>
      customComponents.a({
        children,
        href: props.data.uri,
        target: '_blank',
        rel: 'nofollow noopener noreferrer',
      }),
    [BLOCKS.HEADING_1]: (props, children) => customComponents.h1({ children }),
    [BLOCKS.HEADING_2]: (props, children) => customComponents.h2({ children }),
    [BLOCKS.HEADING_3]: (props, children) => customComponents.h3({ children }),
    [BLOCKS.HEADING_4]: (props, children) => customComponents.h4({ children }),
    [BLOCKS.HEADING_5]: (props, children) => customComponents.h5({ children }),
    [BLOCKS.HEADING_6]: (props, children) => customComponents.h6({ children }),
    [BLOCKS.HEADING_6]: (props, children) => customComponents.h6({ children }),
    [BLOCKS.OL_LIST]: (props, children) => customComponents.ol({ children }),
    [BLOCKS.UL_LIST]: (props, children) => customComponents.ul({ children }),
    [BLOCKS.QUOTE]: (props, children) =>
      customComponents.blockquote({ children }),
    [BLOCKS.PARAGRAPH]: (props, children) => customComponents.p({ children }),
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { __typename } = node.data.target;
      switch (__typename) {
        /**
         * Code Blocks
         */
        case 'ContentfulCodeBlock': {
          const { code } = node.data.target;
          return <MarkdownAst htmlAst={code.childMarkdownRemark.htmlAst} />;
        }
        /**
         * Blog Post Collapsible
         */
        case 'ContentfulBlogPostCollapsible': {
          const { content, summary } = node.data.target;
          return customComponents.details({
            children: [
              <summary key="summary">{summary}</summary>,
              renderRichText(content, contentfulRenderOptions),
            ],
          });
        }
        /**
         * Log error to console if type is not yet implemented
         */
        default:
          console.error(
            `Embedded entry type is not implemented: ${__typename}`,
          );
          return null;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { contentType, url } = node.data.target.file;
      switch (contentType.split('/')[0]) {
        case 'image': {
          return customComponents.figure({
            children: [
              customComponents.a({
                key: 'link',
                children: (
                  <GatsbyImage
                    image={node.data.target.gatsbyImageData}
                    alt={node.data.target.description}
                  />
                ),
                href: node.data.target.file.url,
                target: '_blank',
                rel: 'nofollow noopener noreferrer',
              }),
              customComponents.figcaption({
                key: 'figcaption',
                children: node.data.target.description,
              }),
            ],
          });
        }
        case 'video': {
          return customComponents.figure({
            children: [
              <video
                key="video"
                preload="auto"
                autoPlay
                loop
                muted
                width="100%"
              >
                <source src={url} type={contentType} />
              </video>,
              customComponents.figcaption({
                key: 'figcaption',
                children: node.data.target.description,
              }),
            ],
          });
        }
        default: {
          console.error(`Content type is not implemented: ${contentType}`);
          return null;
        }
      }
    },
  },
};

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
      hero={
        <BlogHero
          attribution={blogPost.heroImage}
          image={blogPost.heroImage.fullImage}
        />
      }
      leadbox={leadbox}
      showLanguageSwitch={false}
      breadcrumb={breadcrumb}
    >
      <BlogHeader headline={blogPost.title} byline={heroByLine} />
      <div>{renderRichText(blogPost.content, contentfulRenderOptions)}</div>

      <PanelContainer>
        <SharePanel title={blogPost.title} />
        <FollowPanel />
      </PanelContainer>
    </Layout>
  );
};
