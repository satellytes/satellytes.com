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
    // continue here, how to load svgr in storybook
    // https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.toString().includes('svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    console.log('XXX found svgRule', fileLoaderRule);

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: ['@svgr/webpack'],
      exclude: /fonts\/.*\.svg/,
      include: path.resolve(__dirname, '../'),
    });

    //     config.module.rules.forEach((rule) => {
    //       if (rule.oneOf) {
    //         // Iterate over the oneOf array and look for the file loader
    //         rule.oneOf.forEach((oneOfRule) => {
    //           if (oneOfRule.loader && oneOfRule.loader.test('file-loader')) {
    //             // Exclude the inline SVGs from the file loader
    //             oneOfRule.exclude.push(/\.svg$/);
    //           }
    //         })
    // console.log('found rule', rule)
    //         rule.push({
    //           test: /\.svg$/,
    //           enforce: 'pre',
    //           loader: require.resolve('@svgr/webpack'),
    //         });
    //       }
    //     });
    return config;
  },
};
