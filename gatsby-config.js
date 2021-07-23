/**
 * On gatsby cloud the deployment urls follow a strict pattern:
 * - https:// DOMAIN_NAME - BRANCH_NAME .gatsby.io
 *
 * Only lower case letters and numbers are used, everything else is filtered out.
 *
 */
const extractGatsbyCloudPreviewUrl = () => {
  const PRODUCTION_BRANCH_NAME = 'main';
  const DOMAIN_NAME = 'satellytescommain';

  // the branch name is set via an env variable on gatsby cloud
  // -> https://support.gatsbyjs.com/hc/en-us/articles/360052322954-Environment-Variables-Specific-to-Gatsby-Cloud
  const BRANCH_NAME = process.env.BRANCH;
  if (!BRANCH_NAME || BRANCH_NAME === PRODUCTION_BRANCH_NAME) {
    return process.env.GATBSY_BASE_URL || '';
  }

  const formattedBranchName = BRANCH_NAME.toLowerCase().replace(
    /[^a-zA-Z0-9]/gi,
    '',
  );

  return `https://${DOMAIN_NAME}-${formattedBranchName}.gtsb.io`;
};

const BASE_URL = extractGatsbyCloudPreviewUrl() || 'http://localhost:8000';

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Satellytes',
    description:
      'Satellytes ist eine Digital-Agentur, die um große Unternehmen kreist und ihnen bei der Transformation und Optimierung digitaler Services und Interfaces hilft.',
    author: 'Satellytes',
    siteUrl: BASE_URL,
  },
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links` /* Please use gatsby-link for remark content */,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog-posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog-posts/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- stop excerpt -->`,
        gfm: true,
        plugins: [
          'gatsby-remark-external-links',
          'gatsby-remark-reading-time',
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
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Satellytes Digital Consulting GmbH',
        short_name: 'Satellytes',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#668CFF',
        display: 'minimal-ui',
        icon: 'data/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
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
            disallow: ['/imprint', '/data-privacy'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/imprint', '/data-privacy'],
        resolvePagePath: ({ path }) => {
          if (!path.endsWith('/')) {
            console.warn(
              'Path of the page does not end with a slash! For SEO reasons all paths should end with a slash:',
              path,
            );
          }
          return path;
        },
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `de`],
        defaultLanguage: `en`,
        fallbackLng: `en`,
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
            matchPath: '/:lang?/career/',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang/office/',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/clients/',
            getLanguageFromPath: true,
            excludeLanguages: ['en'],
          },
          {
            matchPath: '/:lang?/services/',
            getLanguageFromPath: true,
            excludeLanguages: ['en'],
          },
          {
            matchPath: '/:lang/blog/',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/blog/:title/',
            languages: ['en'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false,
        prefixDefault: false,
      },
    },
  ],
};
