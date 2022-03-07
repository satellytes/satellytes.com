/**
 * jest configuration that fits ts-jest and gatsby
 *
 * Docs:
 * - https://www.gatsbyjs.org/docs/unit-testing
 * - https://github.com/kulshekhar/ts-jest/blob/master/docs/user/config/tsConfig.md
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: ['<rootDir>/jest/loadershim.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup-jest.ts'],
  globals: {
    // needs to be set because of gatsby https://www.gatsbyjs.org/docs/unit-testing/#2-creating-a-configuration-file-for-jest
    __PATH_PREFIX__: '',
    __BASE_PATH__: '',
    'ts-jest': {
      tsconfig: {
        allowJs: false,
        jsx: 'react',
      },
    },
  },
  moduleNameMapper: {
    '\\.(css|less|woff|woff2|ttf|eot)$': 'identity-obj-proxy',
    '^gatsby-page-utils/(.*)$': `gatsby-page-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-core-utils/(.*)$': `gatsby-core-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    '^gatsby-plugin-utils/(.*)$': [
      `gatsby-plugin-utils/dist/$1`,
      `gatsby-plugin-utils/$1`,
    ], // Workaround for https://github.com/facebook/jest/issues/9771
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
};
