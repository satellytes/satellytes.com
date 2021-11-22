const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-gatsby',
    'storybook-react-i18next',
    '@storybook/addon-docs',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    /**
     * 1. We exclude svgs from the default file-loader configured by storybook
     * 2. Then we add a new rule to process svg files with `svgr/webpack` so we
     * can load them as React components.
     */
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.toString().includes('svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: ['@svgr/webpack'],
      exclude: /fonts\/.*\.svg/,
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
