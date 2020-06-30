module.exports = {
  siteMetadata: {
    title: 'Satellytes',
    description:
      'Satellytes ist eine Digital-Agentur, die um große Unternehmen kreist und ihnen bei der Transformation und Optimierung digitaler Services und Interfaces hilft.',
    author: 'Satellytes',
  },
  // pathPrefix is only used when build runs with --pathPrefix (needed for gh-pages).
  // it's the base path (https://satellytes.github.io/satellytes.com-new/)
  pathPrefix: '/satellytes.com-new',
  plugins: [
    'gatsby-plugin-react-helmet',
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
        name: 'markdown-pages',
        path: `${__dirname}/data/blog-posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
      },
    },
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
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
  ],
};
