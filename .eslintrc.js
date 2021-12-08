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
    'prettier',
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
    'react/prop-types': 'off',
    // disable some rules that are too strict for the everyday usage for a website
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  ignorePatterns: [
    'gatsby-*.js',
    'jest',
    '*.md',
    'tooling/**',
    'gatsby/**',
    'plugins/**',
  ],
};
