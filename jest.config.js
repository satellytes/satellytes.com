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
  moduleNameMapper: {
    '\\.(css|less|woff|woff2|ttf|eot)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    // '^.+\\.svg$': '<rootDir>/jest/svg-transform.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/jest/fileMock.js',
  },
};
