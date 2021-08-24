const {
  buildGatsbyCloudPreviewUrl,
} = require('./gatsby/util/build-gatsby-cloud-preview-url');

const BASE_URL = buildGatsbyCloudPreviewUrl({
  branchName: process.env.BRANCH, // https://support.gatsbyjs.com/hc/en-us/articles/360052322954-Environment-Variables-Specific-to-Gatsby-Cloud
  fallbackUrl: process.env.GATBSY_BASE_URL || 'http://localhost:8000',
});
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
];

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
            disallow: SEO_EXCLUDED_URLS,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // to read more: https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/#options
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
            }
          }
        }`,
        // returns path und translated path of page
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            const translation = allPages.find((translatedPage) => {
              const path = page.path;
              const translatedPath = translatedPage.path;
              if (translatedPath === path) {
                return false;
              }
              if (path.includes('/de/')) {
                return path.replace('/de', '') === translatedPath;
              } else {
                return translatedPath.replace('/de/', '/') === path;
              }
            });
            return {
              path: page.path,
              translation: translation ? translation.path : undefined,
            };
          });
        },
        filterPages: (page, excludes) => {
          if (excludes === page.path) {
            return true; // excludes page
          }
          if (!page.path.endsWith('/')) {
            console.warn(
              'Path of the page does not end with a slash! For SEO reasons all paths should end with a slash:',
              page.path,
            );
          }
          return false;
        },
        serialize: ({ path, translation }) => {
          const isGermanPath = path.includes('/de/');
          if (!translation) {
            return {
              url: path,
              changefreq: 'daily',
              priority: 0.7,
              links: [{ lang: isGermanPath ? 'de' : 'en', url: path }],
            };
          }
          return {
            url: path,
            changefreq: 'daily',
            priority: 0.7,
            links: [
              { lang: 'de', url: isGermanPath ? path : translation },
              { lang: 'en', url: isGermanPath ? translation : path },
            ],
          };
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
            matchPath: '/:lang?/career/',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/blog/:title/',
            languages: [DEFAULT_LANGUAGE],
          },
        ],
      },
    },
  ],
};
