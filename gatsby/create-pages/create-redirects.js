/**
 * Sometimes we mess up URLs. Fixing them is necessary, but if Google or other
 * Link on external pages still link to the old URL they will only get the 404
 * page. That is why we need to redirect the old links to the new ones.
 */
const createRedirects = ({ actions }) => {
  const { createRedirect } = actions;

  const redirects = [
    {
      fromPath: '/career/325433-senior-backend-engineer-m-w-x/',
      toPath: '/de/career/senior-backend-engineer/',
    },
    {
      fromPath: '/career/325420-senior-frontend-engineer-m-w-x/',
      toPath: '/de/career/senior-frontend-engineer/',
    },
    {
      fromPath: '/career/338504-frontend-engineer-w-m-x/',
      toPath: '/de/career/frontend-engineer/',
    },
    {
      fromPath: '/career/325493-senior-uxui-designer-m-w-x/',
      toPath: '/de/career/senior-ux-ui-designer/',
    },
    {
      fromPath: '/page/imprint/',
      toPath: '/de/imprint/',
    },
  ];

  redirects.forEach((redirect) => {
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

module.exports = {
  createRedirects,
};
