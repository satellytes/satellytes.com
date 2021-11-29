const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-gatsby',
    'storybook-react-i18next',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    /**
     * 1. We exclude svgs from the default file-loader configured by storybook
     * 2. Then we add a new rule to process svg files with `svgr/webpack` so we
     * can load them as React components.
     * 3. We force SVGR to use a named export (which defaults to `ReactComponent`)
     *
     * See the relevant part in the SVGR documentation:
     * https://react-svgr.com/docs/webpack/#use-with-url-loader-or-file-loader
     */
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.toString().includes('svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    const svgrLoader = {
      loader: `@svgr/webpack`,
      options: {
        exportType: 'named',
      },
    };

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: [svgrLoader],
      exclude: /fonts\/.*\.svg/,
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
