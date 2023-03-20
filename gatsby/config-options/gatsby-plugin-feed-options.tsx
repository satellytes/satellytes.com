import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import * as ReactDOMServer from 'react-dom/server';
import { Converter } from 'showdown';
import {
  ContentfulCustomModel,
  EmbeddedAssetType,
} from '../../src/types/contentful.types';
import {
  BASE_URL,
  DEFAULT_META_IMAGE_URL_PATH,
  RSS_FEED_URL,
} from './constants';

// markdown converter for rendering code blocks
const converter: Converter = new Converter();
const markdownToHyperText = (markdown: string) => converter.makeHtml(markdown);

/**
 *
 * @param element React JSX Element
 * @returns content compiled into an HTML string
 */
export const toHtml = (element: JSX.Element) =>
  ReactDOMServer.renderToStaticMarkup(element);

/**
 * Render options for embedded entries to generate HTML strings for the Gatsby RSS Feed plugin.
 *
 */
export const rssRenderOptions: Partial<Options> = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (!node.data.target) {
        console.error(`Embedded entry got no target: ${node.data.target}`);
        return ``;
      }

      const { __typename } = node.data.target;
      switch (__typename) {
        /**
         * Code Blocks
         */
        case ContentfulCustomModel.CONTENTFUL_CODE_BLOCK: {
          const { code, description } = node.data.target;
          return `
            <figure>
              ${markdownToHyperText(code.code)}
              ${description ?? toHtml(<figcaption>{description}</figcaption>)}
            </figure>
          `;
        }
        /**
         * Blog Post Collapsible
         */
        case ContentfulCustomModel.CONTENTFUL_BLOG_POST_COLLAPSIBLE: {
          const { content, summary } = node.data.target;
          return toHtml(
            <details>
              <summary>{summary}</summary>
              {documentToHtmlString(content, rssRenderOptions)}
            </details>,
          );
        }
        /**
         * Blog Post Stats
         */
        case ContentfulCustomModel.CONTENTFUL_STATS: {
          const { statItems } = node.data.target;
          return toHtml(
            <div>
              {statItems.map((item) => (
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.value}</p>
                  <br />
                </div>
              ))}
            </div>,
          );
        }

        /**
         * Advanced Images
         */
        case ContentfulCustomModel.CONTENTFUL_ADVANCED_ASSET: {
          const { image } = node.data.target;
          return toHtml(
            <figure>
              <img src={image.file.url} alt={image.description} />
              <figcaption>{image.description}</figcaption>
            </figure>,
          );
        }
        /**
         * Log error to console if type is not yet implemented
         */
        default:
          console.error(
            `Embedded entry type is not implemented: ${__typename}`,
          );
          return ``;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (!node.data.target.file) {
        console.log(JSON.stringify(node));
        //return '';
      }

      const { url, contentType } = node.data.target.file;
      switch (contentType.split('/')[0]) {
        /**
         * Embedded images
         */
        case EmbeddedAssetType.IMAGE: {
          return toHtml(
            <figure>
              <img src={url} alt={node.data.target.description} />
              <figcaption>{node.data.target.description}</figcaption>
            </figure>,
          );
        }
        /**
         * Embedded videos
         */
        case EmbeddedAssetType.VIDEO: {
          return toHtml(
            <figure>
              <video
                key="video"
                preload="auto"
                autoPlay
                loop
                muted
                width="100%"
              >
                <source src={url} type={contentType} />
              </video>
              <figcaption>{node.data.target.description}</figcaption>
            </figure>,
          );
        }
        /**
         * Log error to console if asset type is not yet implemented
         */
        default:
          console.error(
            `Embedded asset type is not implemented: ${contentType}`,
          );
          return ``;
      }
    },
  },
};

const addImageDataToLinks = ({ content, node }) => {
  // Skip everything but entry and asset blocks
  if (
    content.nodeType !== 'embedded-entry-block' &&
    content.nodeType !== 'embedded-asset-block'
  ) {
    if (content.content) {
      return {
        ...content,
        content: content.content.map((el) =>
          addImageDataToLinks({ content: el, node }),
        ),
      };
    } else {
      return content;
    }
  }

  const data =
    node.content.references.find(
      (ref) => ref.contentful_id === content.data?.target?.sys?.id,
    ) ?? {};

  const newContent = { ...content };
  newContent.data = { ...content.data, target: data };

  return newContent;
};

const feedOptions = {
  query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `,
  feeds: [
    {
      serialize: ({ query: { site, allContentfulBlogPost } }) => {
        return allContentfulBlogPost.nodes.map((node) => {
          const imageUrl = `${BASE_URL}${
            node.heroImage.image?.resize?.src ?? DEFAULT_META_IMAGE_URL_PATH
          }`;
          const coverImage =
            node.heroImage && node.heroImage.creator
              ? toHtml(
                  <figure>
                    <img src={imageUrl} alt="" />
                    <figcaption>
                      <a
                        href={node.heroImage.source}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Image by {node.heroImage.creator}
                      </a>
                    </figcaption>
                  </figure>,
                )
              : toHtml(<img src={imageUrl} alt="" />);
          // combine intro text and copy/body text
          const introRaw = node.introRichText
            ? JSON.parse(node.introRichText.raw)
            : {};
          const copyRaw = JSON.parse(node.content.raw);
          const rawContent = { ...copyRaw };
          if (introRaw.content)
            rawContent.content = [...introRaw.content, ...copyRaw.content];

          const contentWithEmbeddedEntries = rawContent.content.map((content) =>
            addImageDataToLinks({ content, node }),
          );

          const newContent = {
            ...rawContent,
            content: contentWithEmbeddedEntries,
          };

          const rssHtml = documentToHtmlString(newContent, rssRenderOptions);

          return {
            title: node.title,
            site_url: site.siteMetadata.siteUrl,
            date: node.publicationDate,
            description: node.seoMetaText,
            url: site.siteMetadata.siteUrl + node.fields.path,
            guid: site.siteMetadata.siteUrl + node.fields.path,
            custom_elements: [
              '<enclosure url="https://images.ctfassets.net/54dnxp2417nl/5fCePk8aewwPIKCj9I5aTj/b652db31186358c555df2db14b65bbb7/gatsby-next-remix-hero.jpg" length="744356" type="image/jpeg"></enclosure>',
              {
                'content:encoded': `${coverImage} ${rssHtml}`,
              },
            ],
          };
        });
      },
      query: `
          {
            allContentfulBlogPost(
              filter: { node_locale: { eq: "en" } }
              sort: { publicationDate: DESC }
            ) {
              nodes {
                introRichText {
                  raw
                }
                content {
                  raw
                  references {
                    ... on ContentfulCodeBlock {
                      contentful_id
                      __typename
                      description
                      code {
                        code
                        childMarkdownRemark {
                          htmlAst
                        }
                      }
                    }
                    ... on ContentfulAsset {
                      contentful_id
                      description
                      file {
                        contentType
                        url
                      }
                      title
                      __typename
                    }

                    ... on ContentfulFootnote {
                      contentful_id
                      __typename
                      note {
                        childMarkdownRemark {
                          htmlAst
                        }
                      }
                    }

                    ... on ContentfulStats {
                      contentful_id
                      __typename
                      statItems {
                        label
                        value
                      }
                    }

                    ... on ContentfulAdvancedAsset {
                      contentful_id
                      __typename
                      image {
                        file {
                          url
                        }
                        contentful_id
                        description
                        gatsbyImageData(layout: FULL_WIDTH, quality: 80)
                        title
                        __typename
                      }
                      fullWidth
                    }

                    ... on ContentfulBlogPostCollapsible {
                      contentful_id
                      __typename
                      summary
                      content {
                        raw
                        references {
                          ... on ContentfulCodeBlock {
                            contentful_id
                            __typename
                            description
                            code {
                              code
                              childMarkdownRemark {
                                htmlAst
                              }
                            }
                          }
                          ... on ContentfulAsset {
                            contentful_id
                            description
                            file {
                              contentType
                              url
                            }
                            gatsbyImageData(width: 1440)
                            title
                            __typename
                          }
                        }
                      }
                    }
                  }
                }
                seoMetaText
                fields {
                  path
                }
                rssHtml
                slug
                title
                publicationDate
                heroImage {
                  image {
                    url
                    resize(width: 1440, height: 760) {
                      src
                    }
                  }
                  creator
                  source
                }
              }
            }
          }
        `,
      output: RSS_FEED_URL,
      title: 'Satellytes',
      image_url: BASE_URL + DEFAULT_META_IMAGE_URL_PATH,
      // optional configuration to insert feed reference in pages:
      // if `string` is used, it will be used to create RegExp and then test if pathname of
      // current page satisfied this regular expression;
      // if not provided or `undefined`, all pages will have feed reference inserted
      match: '^/blog/',
      site_url: 'https://satellytes.com',
    },
  ],
};

export default feedOptions;
