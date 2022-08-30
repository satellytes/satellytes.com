interface Redirect {
  fromPath: string;
  toPath: string;
  noIndex?: boolean;
}

/**
 * List of redirects.
 */
export const redirects: Redirect[] = [
  {
    fromPath: '/career/325433-senior-backend-engineer-m-w-x',
    toPath: '/de/career/senior-backend-engineer',
  },
  {
    fromPath: '/career/325433-senior-backend-engineer-(mwx)',
    toPath: '/de/career/senior-backend-engineer',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-m-w-x',
    toPath: '/de/career/senior-frontend-engineer',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-(mwx)',
    toPath: '/de/career/senior-frontend-engineer',
  },
  {
    fromPath: '/career/338504-frontend-engineer-w-m-x',
    toPath: '/de/career/frontend-engineer',
  },
  {
    fromPath: '/career/338504-frontend-engineer-(wmx)',
    toPath: '/de/career/frontend-engineer',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-m-w-x',
    toPath: '/de/career/senior-ux-ui-designer',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-(mwx)',
    toPath: '/de/career/senior-ux-ui-designer',
  },
  {
    fromPath: '/page/imprint',
    toPath: '/de/imprint',
  },
  {
    fromPath: '/office',
    toPath: '/about-us',
  },
  {
    fromPath: '/de/office',
    toPath: '/about-us',
  },
  {
    fromPath: '/blog/scoped-registry',
    toPath: '/blog/enterprises-benefit-from-scoped-npm-registries',
  },
  {
    fromPath: '/de/blog/monorepo-codeowner-github-enterprise',
    toPath: '/blog/monorepo-codeowner-github-enterprise',
  },
  {
    fromPath: '/blog/thoughts-on-collaborative-work',
    toPath: '/blog/four-ways-to-improve-collaboration-in-your-team',
  },

  /**
   * Blog posts have been moved from "/blog/[slug]" to "/blog/post/[slug]"
   */
  {
    fromPath: '/blog/we-work-remotely',
    toPath: '/blog/post/we-work-remotely',
  },
  {
    fromPath: '/blog/four-ways-to-improve-collaboration-in-your-team',
    toPath: '/blog/post/four-ways-to-improve-collaboration-in-your-team',
  },
  {
    fromPath: '/blog/boosting-developer-productivity-with-github-actions',
    toPath: '/blog/post/boosting-developer-productivity-with-github-actions',
  },
  {
    fromPath: '/blog/cache-gatsby-ssr-pages-on-gatsby-cloud',
    toPath: '/blog/post/cache-gatsby-ssr-pages-on-gatsby-cloud',
  },
  {
    fromPath: '/blog/cloudfront-cache-efficiency',
    toPath: '/blog/post/cloudfront-cache-efficiency',
  },
  {
    fromPath: '/blog/interview-felix-hamann',
    toPath: '/blog/post/interview-felix-hamann',
  },
  {
    fromPath: '/blog/getting-started-gatsby-next-remix',
    toPath: '/blog/post/getting-started-gatsby-next-remix',
  },
  {
    fromPath: '/blog/enterprises-benefit-from-scoped-npm-registries',
    toPath: '/blog/post/enterprises-benefit-from-scoped-npm-registries',
  },
  {
    fromPath: '/blog/gather-metaverse-bump-each-other-2021',
    toPath: '/blog/post/gather-metaverse-bump-each-other-2021',
  },
  {
    fromPath: '/blog/interview-daniel-eissing',
    toPath: '/blog/post/interview-daniel-eissing',
  },
  {
    fromPath: '/blog/the-modern-code-reviewer-2021',
    toPath: '/blog/post/the-modern-code-reviewer-2021',
  },
  {
    fromPath: '/blog/github-billing-dashboard',
    toPath: '/blog/post/github-billing-dashboard',
  },
  {
    fromPath: '/blog/how-consistency-helps-you-to-optimize-gatsby-urls',
    toPath: '/blog/post/how-consistency-helps-you-to-optimize-gatsby-urls',
  },
  {
    fromPath: '/blog/monorepo-codeowner-github-enterprise',
    toPath: '/blog/post/monorepo-codeowner-github-enterprise',
  },
  {
    fromPath: '/blog/typescript-ast-type-checker',
    toPath: '/blog/post/typescript-ast-type-checker',
  },
  {
    fromPath: '/blog/angular-inject-the-injector',
    toPath: '/blog/post/angular-inject-the-injector',
  },
  {
    fromPath: '/blog/angular-workshop-kaiserx-allianz-2018',
    toPath: '/blog/post/angular-workshop-kaiserx-allianz-2018',
  },

  /**
   * convenience URLs for our internal tools
   */
  {
    fromPath: '/orion',
    toPath: 'https://gather.town/app/ea0xvXaHYWuWurME/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/gather',
    toPath: 'https://gather.town/app/ea0xvXaHYWuWurME/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/github',
    toPath: 'https://github.com/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/slack',
    toPath: 'https://app.slack.com/client/T9B7YFCC8',
    noIndex: true,
  },
  {
    fromPath: '/notion',
    toPath: 'https://www.notion.so/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/personio',
    toPath: 'https://satellytes.personio.de',
    noIndex: true,
  },
  {
    fromPath: '/lattice',
    toPath: 'https://satellytes.latticehq.com',
    noIndex: true,
  },
];
