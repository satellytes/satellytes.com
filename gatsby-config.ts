import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import dotenv from 'dotenv';
import type { GatsbyConfig, IPluginRefOptions } from 'gatsby';
import * as siteMapTransformers from './gatsby/gatsby-plugin-sitemap/gatsby-plugin-sitemap';
import feedOptions from './gatsby/config-options/feed-options';
import {
  BASE_URL,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  SEO_EXCLUDED_URLS,
} from './gatsby/config-options/config-constants';

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
      options: feedOptions,
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
