/**
 * Needs to be done because of gatsby:
 * https://www.gatsbyjs.org/docs/unit-testing/#2-creating-a-configuration-file-for-jest
 */

// @ts-ignore
global.___loader = {
  enqueue: jest.fn(),
};
