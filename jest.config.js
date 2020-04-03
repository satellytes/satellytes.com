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
    'ts-jest': {
      // rewrite locale ts-config to work with ts-jest
      tsConfig: {
        allowJs: false,
        jsx: 'react',
      },
    },
  },
};
