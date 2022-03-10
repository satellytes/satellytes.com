import { resolvePages, serialize, filterPages } from './gatsby-plugin-sitemap';

const EXAMPLES_NODES = {
  allSitePage: {
    nodes: [
      { path: '/some-page/' },
      { path: '/de/some-page/' },
      { path: '/de/only-german/' },
      { path: '/only-default/' },
      { path: '/ignore-me/' },
    ],
  },
};

const createPagesNodes = (nodes) => {
  return { allSitePage: { nodes } };
};

describe('Gatsby Plugin Sitemap', () => {
  test('works', () => {
    const allPages = resolvePages(EXAMPLES_NODES);
    const excludes = ['/ignore-me/'];
    const filteredPages = allPages.filter(
      (page) =>
        !excludes.some((excludedRoute) => filterPages(page, excludedRoute)),
    );
    const result = filteredPages.map((page) => serialize(page));
    expect(result).toMatchSnapshot();
  });

  describe('filterPages', () => {
    test('excludes a page', () => {
      const result = filterPages({ path: 'exclude-me/' }, 'exclude-me/');
      expect(result).toBe(true);
    });
    test('accepts a page', () => {
      const result = filterPages({ path: 'include-me/' }, 'exclude-me/');
      expect(result).toBe(false);
    });
  });

  describe('resolvePages', () => {
    test("a page without a language in the path receives the 'en' language (default)", () => {
      const nodes = createPagesNodes([{ path: '/some-page/' }]);
      const [result] = resolvePages(nodes);
      expect(result.lang).toBe('en');
    });

    test('determine the correct language from the path', () => {
      const nodes = createPagesNodes([{ path: '/de/some-page' }]);
      const [result] = resolvePages(nodes);
      expect(result.lang).toBe('de');
    });

    /**
     * well that could be handled better but we don't want to over engineer things for now
     */
    test('unknown languages (eg. `es`) are ignored and treated as a default url', () => {
      const nodes = createPagesNodes([{ path: '/es/some-page' }]);
      const [result] = resolvePages(nodes);
      expect(result.lang).toBe('en');
    });
    test("two related pages link each other's translations", () => {
      const nodes = createPagesNodes([
        { path: '/some-page/' },
        { path: '/de/some-page/' },
        { path: '/unrelated-page/' },
      ]);
      const [page1, page2, _] = resolvePages(nodes);
      expect(page1).toEqual(
        expect.objectContaining({ lang: 'en', path: '/some-page/' }),
      );
      expect(page2).toEqual(
        expect.objectContaining({ lang: 'de', path: '/de/some-page/' }),
      );
      expect(page1.links).toEqual(page2.links);
    });
  });

  describe('serialize', () => {
    test('creates a correct sitemap entry', () => {
      const result = serialize({
        path: '/some-page/',
        language: 'en',
        links: [
          {
            lang: 'en',
            path: 'abc/',
          },
          {
            lang: 'de',
            path: 'de/abc/',
          },
        ],
      });

      expect(result).toEqual({
        url: '/some-page/',
        priority: 0.8,
        lastmod: undefined,
        changefreq: 'daily',
        links: [
          {
            lang: 'en',
            url: 'abc/',
          },
          {
            lang: 'de',
            url: 'de/abc/',
          },
        ],
      });
    });
  });
});
