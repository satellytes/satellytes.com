import { GatsbyNode } from 'gatsby';

const REDIRECTS = [
  {
    fromPath: '/career/325433-senior-backend-engineer-m-w-x/',
    toPath: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325433-senior-backend-engineer-(mwx)/',
    toPath: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-m-w-x/',
    toPath: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-(mwx)/',
    toPath: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-w-m-x/',
    toPath: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-(wmx)/',
    toPath: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-m-w-x/',
    toPath: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-(mwx)/',
    toPath: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/page/imprint/',
    toPath: '/de/imprint/',
  },
  {
    fromPath: '/office/',
    toPath: '/about-us/',
  },
  {
    fromPath: '/de/office/',
    toPath: '/about-us/',
  },
  {
    fromPath: '/blog/scoped-registry/',
    toPath: '/blog/enterprises-benefit-from-scoped-npm-registries/',
  },
  {
    fromPath: '/de/blog/monorepo-codeowner-github-enterprise/',
    toPath: '/blog/monorepo-codeowner-github-enterprise/',
  },
];

/**
 * Sometimes we mess up URLs. Fixing them is necessary, but if Google or other
 * some other external links still link to the old URL they will only get the 404
 * page. That is why we need to redirect the old links to the new ones.
 */
export const createRedirects: GatsbyNode['createPages'] = ({ actions }) => {
  const { createRedirect } = actions;
  /**
   * Our vanity url to access our gather office through satellytes.com/orion
   * This should be a temporary redirect and actually SEO should never pick this url up anyway.
   */
  createRedirect({
    fromPath: `/orion/`,
    toPath: `/api/redirect-gather-sy-office`,
  });

  REDIRECTS.forEach((redirect) => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
      isPermanent: true,
      redirectInBrowser: true,
    });

    // the redirect only works for exact matches, that's why we also need to
    // create a redirect without the trailing slash
    const additionalFromPath = redirect.fromPath.substring(
      0,
      redirect.fromPath.length - 1,
    );

    createRedirect({
      fromPath: additionalFromPath,
      toPath: redirect.toPath,
      isPermanent: true,
      redirectInBrowser: true,
    });
  });
};
