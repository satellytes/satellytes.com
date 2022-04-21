import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { BlogArticleQueryData } from '../../../templates/blog-post';
import { BreadcrumbEntry } from '../../../types';
import { BlogHeader } from '../../content/blog-header/blog-header';
import { BlogHero } from '../../content/heroes/blog-hero';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { LONG_DATE_FORMAT, useLocaleFormat } from '../../i18n-helpers';
import { Layout } from '../../layout/layout';
import { scrollToTarget } from '../../layout/use-anchor-tag-scrolling';
import customComponents from '../../legacy/markdown/custom-components';
import { MarkdownAst } from '../../legacy/markdown/markdown-ast';
import { up } from '../../support/breakpoint';
import FollowPanel from './follow-panel';
import SharePanel from './share-panel';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ContentfulFootnoteReference
  extends ContentfulRichTextGatsbyReference {
  note: any; // TODO: Improve typing here
}

enum ContentfulCustomModel {
  CONTENTFUL_FOOTNOTE = 'ContentfulFootnote',
  CONTENTFUL_CODE_BLOCK = 'ContentfulCodeBlock',
  CONTENTFUL_BLOG_POST_COLLAPSIBLE = 'ContentfulBlogPostCollapsible',
}

enum EmbeddedAssetType {
  IMAGE = 'image',
  VIDEO = 'video',
}
interface FootnoteReference {
  [key: string]: {
    index: number;
    anchor: string;
    referenceAnchor: string;
  };
}

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

/**
 * Custom Contentful Rich Text Renderer
 *
 * Will automatically filter out ContentfulFootnote elements and appends an
 * ordered list of footnotes after the rendered rich text.
 *
 * @param data rich text data
 * @returns rendered elements
 */
const customContentfulRenderer = (
  data: RenderRichTextData<ContentfulRichTextGatsbyReference>,
) => {
  /**
   * Filter out footnotes from content references
   */
  const footnotes: ContentfulFootnoteReference[] = data.references.filter(
    (reference) =>
      reference.__typename === ContentfulCustomModel.CONTENTFUL_FOOTNOTE,
  ) as ContentfulFootnoteReference[];

  /**
   * Create an object that contains information we'll use later
   */
  const footnoteReferences: FootnoteReference = {};
  footnotes.map(
    (footnote, index) =>
      (footnoteReferences[footnote.contentful_id] = {
        index: index + 1,
        anchor: `footnote-${index + 1}`,
        referenceAnchor: `footnote-${index + 1}-reference`,
      }),
  );

  /**
   * The options object used by the Contentful Rich Text Renderer
   */
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
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { __typename } = node.data.target;
        switch (__typename) {
          /**
           * Footnote
           */
          case ContentfulCustomModel.CONTENTFUL_FOOTNOTE: {
            const { contentful_id } = node.data.target;
            const reference = footnoteReferences[contentful_id];

            return customComponents.a({
              id: reference.referenceAnchor,
              children: <sup>{reference?.index}</sup>,
              href: `#${reference?.anchor}`,
              onClick: (e: MouseEvent) => {
                e.preventDefault();
                const target = document.querySelector(
                  `[id='${reference?.anchor}']`,
                );
                history.pushState({}, '', `#${reference?.anchor}`);
                scrollToTarget(target);
              },
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
      [BLOCKS.HEADING_1]: (props, children) =>
        customComponents.h1({ children }),
      [BLOCKS.HEADING_2]: (props, children) =>
        customComponents.h2({ children }),
      [BLOCKS.HEADING_3]: (props, children) =>
        customComponents.h3({ children }),
      [BLOCKS.HEADING_4]: (props, children) =>
        customComponents.h4({ children }),
      [BLOCKS.HEADING_5]: (props, children) =>
        customComponents.h5({ children }),
      [BLOCKS.HEADING_6]: (props, children) =>
        customComponents.h6({ children }),
      [BLOCKS.HEADING_6]: (props, children) =>
        customComponents.h6({ children }),
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
          case ContentfulCustomModel.CONTENTFUL_CODE_BLOCK: {
            const { code, description } = node.data.target;
            return customComponents.figure({
              children: [
                <MarkdownAst
                  key="code-block"
                  htmlAst={code.childMarkdownRemark.htmlAst}
                />,
                description &&
                  customComponents.figcaption({
                    children: description,
                    key: 'caption',
                  }),
              ],
            });
          }
          /**
           * Blog Post Collapsible
           */
          case ContentfulCustomModel.CONTENTFUL_BLOG_POST_COLLAPSIBLE: {
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
          /**
           * Embedded images
           */
          case EmbeddedAssetType.IMAGE: {
            return customComponents.figure({
              children: [
                <Zoom key={node.data.target.file.url}>
                  <GatsbyImage
                    image={node.data.target.gatsbyImageData}
                    alt={node.data.target.description}
                  />
                </Zoom>,
                customComponents.figcaption({
                  key: 'figcaption',
                  children: node.data.target.description,
                }),
              ],
            });
          }
          /**
           * Embedded videos
           */
          case EmbeddedAssetType.VIDEO: {
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

  /**
   * Footnote elements
   */
  const footNoteElements = customComponents.ol({
    children: footnotes.map((footnote) => {
      const { contentful_id, note } = footnote;
      const { anchor, referenceAnchor } = footnoteReferences[contentful_id];
      return (
        <li key={contentful_id} id={anchor}>
          <div style={{ display: 'flex', gap: 10 }}>
            <MarkdownAst
              key={contentful_id}
              htmlAst={note.childMarkdownRemark.htmlAst}
            />
            {customComponents.a({
              children: '\u21A9',
              href: `#${referenceAnchor}`,
              onClick: (e: MouseEvent) => {
                e.preventDefault();
                const target = document.querySelector(
                  `[id='${referenceAnchor}']`,
                );
                history.pushState({}, '', `#${referenceAnchor}`);
                scrollToTarget(target);
              },
            })}
          </div>
        </li>
      );
    }),
  });

  /**
   * Rendered Rich Text + Footnotes
   */
  return (
    <div>
      {renderRichText(data, contentfulRenderOptions)}
      {footnotes.length > 0 && (
        <>
          <hr />
          {footNoteElements}
        </>
      )}
    </div>
  );
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
      <BlogHeader headline={blogPost.title} byline={heroByLine}>
        {blogPost.introText?.introText}
      </BlogHeader>
      {customContentfulRenderer(blogPost.content)}

      <PanelContainer>
        <SharePanel title={blogPost.title} />
        <FollowPanel />
      </PanelContainer>
    </Layout>
  );
};
