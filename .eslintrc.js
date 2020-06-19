module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest-dom/recommended',

    // prettier needs to be the last in the array to overwrite existing configs
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'jest-dom'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // disabled because of https://github.com/yannickcr/eslint-plugin-react/issues/2353
    'react/prop-types': [0],

    // to not need to add a return type on styled-components props
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  ignorePatterns: ['gatsby-config.js', 'jest', '*.md'],
};
