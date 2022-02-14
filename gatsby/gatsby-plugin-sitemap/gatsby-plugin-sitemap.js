const TRANSLATION_KEY_REGEX = /^\/(de)(\/.*)$/;
const DEFAULT_LANGUAGE = 'en';

/**
 * Extract the language key from the given path.
 * return the language key or if none is found it returns the default
 * language'.
 *
 * Example:
 *
 * `/de/simple-path` -> de
 * `/simple-path` -> en
 *
 * This will also mean that unsupported languages are ignored and treated as english
 * `/es/simple-path` -> en
 */
const extractLangKey = (path) => {
  const match = TRANSLATION_KEY_REGEX.exec(path);
  if (match) {
    const [_, languageKeyMatched] = match;
    return languageKeyMatched;
  }

  return DEFAULT_LANGUAGE;
};

/**
 * Given a url try to remove the first path segment if it matches a translated
 * url which we check through a static regex (which currently only involves the check for `de`)
 */
const normalizePath = (path) => {
  const match = TRANSLATION_KEY_REGEX.exec(path);
  if (match) {
    const [, , remainingPath] = match;
    return remainingPath;
  }

  return path;
};

/**
 * Given a normalized path where any valid language key is stripped
 * we can derive the translated url.
 * Example: Normalized path is `/my-page` and we can now create two urls from here:
 * `createTranslatedUrl('/my-page', 'de')`
 * Result: `/de/my-page`
 *
 * `createTranslatedUrl('/my-page', 'en')`
 * Result:  `/my-page` (unchanged, because it's our default language)
 */
const createTranslatedUrl = (normalizedPath, language) => {
  if (language === DEFAULT_LANGUAGE) {
    return normalizedPath;
  }
  return `/${language}${normalizedPath}`;
};

/**
 * Given a set of pages nodes which only need carry a `path` attribute,
 * we traverse all of the pages and group them by their `normalized` path
 * which is the path stripped of any known language key. That way we have
 * clusters of translated pages.
 *
 * The map looks as follows for three given paths `/some-page`, `/de/some-page` and `/unrelated-page`.
 * ```
 *  Map(2) {
 *     '/some-page' => Set(2) { 'en', 'de' },
 *    '/unrelated-page' => Set(1) { 'en' }
 *  }
 * ```
 */
const createPageTranslationLookup = (paths) => {
  const map = new Map();

  for (path of paths) {
    const normalizedPageId = normalizePath(path);

    if (!map.has(normalizedPageId)) {
      map.set(normalizedPageId, new Set());
    }

    const languageKey = extractLangKey(path);
    const translationSet = map.get(normalizedPageId);
    translationSet.add(languageKey);
  }
  return map;
};

/**
 * Given a normalizedPath and a set of languages
 * we can construct a list of links that tell about their `lang` and the actual `path`
 * to the translation
 */
const createTranslationLinks = (normalizedPath, languages) => {
  let result = [];
  for (const lang of languages.values()) {
    result.push({
      lang,
      path: createTranslatedUrl(normalizedPath, lang),
    });
  }

  return result;
};

/**
 * Gatsby will invoke the following three function in the order `resolvePages`, `filteredPages` & `serialize`
 * The actual invocation looks like this
 * ```
 * const resolvedPages = resolvePages(PAGE_QUERY_RESULT)
 * const filteredPages = resolvedPages.filter(
 *   page => !excludes.some(excludedRoute => filterPages(page, excludedRoute))
 * )
 * const sitemapResult = filteredPages.map(page => serialize(page));
 * ```
 */
function gatsbyPluginSitemap({ allSitePage: { nodes: allPages } }) {
  const paths = allPages.map(({ path }) => path);
  const translationLookup = createPageTranslationLookup(paths);

  return allPages.map(({ path, pageContext }) => {
    const normalizedPath = normalizePath(path);
    const languageKey = extractLangKey(path);

    const translations = translationLookup.get(normalizedPath);
    const links = createTranslationLinks(normalizedPath, translations);

    return {
      lang: languageKey,
      path,
      links,
      publicationDate: pageContext?.publicationDate,
    };
  });
}

function serialize(sitemapItem) {
  const HIGH_PRIO =
    sitemapItem.path.includes('/blog') ||
    sitemapItem.path.includes('/career') ||
    sitemapItem.path === '/' ||
    sitemapItem.path === '/de';

  // remap our links from {lang, path} to {lang, url}
  const alternateLinks = sitemapItem.links.map((item) => {
    return {
      lang: item.lang,
      url: item.path, // the plugin will prefix the siteUrl after the serialization
    };
  });

  return {
    url: sitemapItem.path,

    // there is a lot of fuzz about changefreq and priority, some even say it
    // doesn't have any effect at all. so let's use a very simple definition
    changefreq: 'daily',
    priority: HIGH_PRIO ? 1 : 0.8,

    // publicationDate is optional and won't be rendered if not present
    lastmod: sitemapItem.publicationDate,
    links: alternateLinks,
  };
}

function filterPages({ path }, excludes) {
  const [EXCLUDE, KEEP] = [true, false];

  if (excludes === path) {
    return EXCLUDE;
  }

  if (!path.endsWith('/')) {
    console.warn(
      `Path '${path}' does not end with a slash! For SEO reasons all paths should end with a slash`,
    );
  }

  return KEEP;
}

module.exports = {
  resolvePages: gatsbyPluginSitemap,
  serialize,
  filterPages,
};
