const { resolvePages, serialize } = require('./resolve-pages');

const EXAMPLES_NODES = {
  allSitePage: {
    nodes: [
      { path: '/some-page' },
      { path: '/de/some-page' },
      { path: '/de/only-german' },
      { path: '/only-default' },
    ],
  },
};
describe('Gatsby Plugin Sitemap', () => {
  test('serialize creates a correct sitemap entry', () => {
    const result = serialize({
      path: '/some-page',
      language: 'en',
      links: [
        {
          lang: 'en',
          path: 'abc',
        },
        {
          lang: 'de',
          path: 'de/abc',
        },
      ],
    });

    expect(result).toEqual({
      url: '/some-page',
      changefreq: 'daily',
      priority: 0.7,
      links: [
        {
          lang: 'en',
          url: 'abc',
        },
        {
          lang: 'de',
          url: 'de/abc',
        },
      ],
    });
  });

  test('resolve transforms page nodes into sitemap items', () => {
    const result = resolvePages(EXAMPLES_NODES);

    expect(result).toEqual([
      { path: '/some-page', languageKey: 'en', normalizedPath: '/some-page' },
      {
        path: '/de/some-page',
        languageKey: 'de',
        normalizedPath: '/some-page',
      },
      {
        path: '/de/only-german',
        languageKey: 'de',
        normalizedPath: '/only-german',
      },
      {
        path: '/only-default',
        languageKey: 'en',
        normalizedPath: '/only-default',
      },
    ]);
    // test("resolve transforms page nodes into sitemap items", () => {
    //   const result = resolvePages(EXAMPLES_NODES)
    //   expect(result).toEqual([
    //     { path: '/some-page', translation: '/de/some-page' },
    //     { path: '/de/some-page', translation: '/some-page' },
    //     { path: '/de/only-german', translation: undefined },
    //     { path: '/only-default', translation: undefined }
    //   ]);
  });
});
