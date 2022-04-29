import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import dotenv from 'dotenv';
import type { GatsbyConfig, IPluginRefOptions } from 'gatsby';
import * as siteMapTransformers from './gatsby/gatsby-plugin-sitemap/gatsby-plugin-sitemap';
import { buildGatsbyCloudPreviewUrl } from './gatsby/util/build-gatsby-cloud-preview-url';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig: IPluginRefOptions = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

// host is only set in local & preview environments
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const GATSBY_SITE_PREFIX = process.env.GATSBY_SITE_PREFIX || '';
const BRANCH_PREVIEW_URL = buildGatsbyCloudPreviewUrl({
  prefix: GATSBY_SITE_PREFIX,
  branch: process.env.BRANCH,
});

// either use a branch preview url if any
const BASE_URL =
  BRANCH_PREVIEW_URL || process.env.GATBSY_BASE_URL || 'http://localhost:8000';

const LANGUAGES = ['en', 'de'];
const DEFAULT_LANGUAGE = 'en';

// excluded urls for sitemap and robots.txt
const SEO_EXCLUDED_URLS = [
  '/imprint/',
  '/data-privacy/',
  '/de/imprint/',
  '/de/data-privacy/',
  '/**/404/',
  '/de/404/',
  '/**/404.html',
  '/de/404.html',
  '/blog/page/',
];

const RSS_FEED_URL = '/blog/rss.xml';
const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';

const gatsbyConfig: GatsbyConfig = {
  trailingSlash: 'always',
  siteMetadata: {
    title: 'Satellytes',
    description:
      'Passionate experts that strive to build the best possible and above all right solution for our clients and customers.',
    author: 'Satellytes',
    siteUrl: BASE_URL,
  },
  plugins: [
    {
      resolve: `sy-personio-jobs-source-plugin`,
      options: {
        slugPrefix: `career`,
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links` /* Please use gatsby-link for remark content */,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `./src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `./data`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- stop excerpt -->`,
        gfm: true,
        plugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '±',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              linkImagesToOriginal: true,
              withWebp: true,
              showCaptions: true,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        types: {
          MarkdownRemark: (source) => source.rawMarkdownBody,
          ContentfulBlogPost: (blogPost) =>
            documentToPlainTextString(JSON.parse(blogPost.content.raw)),
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
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
                  node.heroImage.image?.resize?.src ??
                  DEFAULT_META_IMAGE_URL_PATH
                }`;
                const coverImage =
                  node.heroImage && node.heroImage.creator
                    ? `
                    <figure>
                      <img src='${imageUrl}' alt=''>
                      <figcaption><a href='${node.heroImage.source}' target='_blank' rel="nofollow noreferrer">Image by ${node.heroImage.creator}</figcaption>
                    </figure>
                  `
                    : `
                    <img src='${imageUrl}' alt=''>
                  `;

                return {
                  title: node.title,
                  site_url: site.siteMetadata.siteUrl,
                  date: node.publicationDate,
                  description: node.seoMetaText,
                  url: site.siteMetadata.siteUrl + node.fields.path,
                  guid: site.siteMetadata.siteUrl + node.fields.path,
                  custom_elements: [
                    {
                      'content:encoded': `${coverImage} <p>${node.introText?.introText}</p> ${node.rssHtml}`,
                    },
                  ],
                };
              });
            },
            query: `
              {
                allContentfulBlogPost(sort: { order: DESC, fields: [publicationDate] }) {
                  nodes {
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
                    introText {
                      introText
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
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Satellytes Digital Consulting GmbH',
        short_name: 'Satellytes',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#3E61EE',
        display: 'minimal-ui',
        icon: 'data/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://satellytes.com',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://satellytes.com',
        sitemap: 'https://satellytes.com/sitemap/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: SEO_EXCLUDED_URLS,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: SEO_EXCLUDED_URLS,
        query: `
        {
          site {
             siteMetadata {
               siteUrl
             }
           }
          allSitePage {
            nodes {
              path
              pageContext
            }
          }
        }`,
        // returns path und translated path of page
        resolvePages: siteMapTransformers.resolvePages,
        filterPages: siteMapTransformers.filterPages,
        serialize: siteMapTransformers.serialize,
      },
    },
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          '/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/src/assets/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: LANGUAGES,
        defaultLanguage: DEFAULT_LANGUAGE,
        redirect: false,
        fallbackLng: DEFAULT_LANGUAGE,
        siteUrl: `https://satellytes.com/`,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: '/:lang?/career/:id/',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/blog/post/:title/',
            languages: [DEFAULT_LANGUAGE],
          },
        ],
      },
    },
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
};

export default gatsbyConfig;
