const TRANSLATION_KEY_REGEX = /^\/(de|es)(\/.*)$/;
const DEFAULT_LANGUAGE = 'en';
const { groupBy, uniq } = require('lodash');

/**
 * extract the language key from the given path.
 * return the language key or if none is found it returns the default
 * language'
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
 * if a language key is present remove it to get the expected path for the default
 * language to group translated pages based on this value later.
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
 * transform all raw page nodes into a format we can use in the serialization process
 * to create the sitemap entries
 */

function createTranslatedUrl(masterId, language) {
  if (language === DEFAULT_LANGUAGE) {
    return masterId;
  }
  return `/${language}${masterId}`;
}

function createPageTranslationLookup(pages) {
  const map = new Map();

  for ({ path } of pages) {
    const masterID = normalizePath(path);

    if (!map.has(masterID)) {
      map.set(masterID, new Set());
    }

    const languageKey = extractLangKey(path);
    const translationSet = map.get(masterID);
    translationSet.add(languageKey);
  }

  return map;
}

function createTranslationLinks(masterID, languages) {
  let result = [];
  for (const language of languages.values()) {
    result.push({
      language,
      path: createTranslatedUrl(masterID, language),
    });
  }

  return result;
}

function resolvePages({ allSitePage: { nodes: allPages } }) {
  const translationLookup = createPageTranslationLookup(allPages);

  return allPages.map(({ path }) => {
    const masterID = normalizePath(path);
    const translations = translationLookup.get(masterID);
    const links = createTranslationLinks(masterID, translations);

    return {
      lang: extractLangKey(path),
      path,
      links,
    };
  });
}

function serialize(sitemapItem) {
  console.log('*** serialize', sitemapItem);

  // { lang: 'de', url: isGermanPath ? path : translation },
  return {
    url: sitemapItem.path,
    changefreq: 'daily',
    priority: 0.7,
    links: sitemapItem.links.map((item) => {
      return {
        lang: item.lang,
        url: item.path,
      };
    }),
  };
}

function filterPages(page, excludes) {
  console.log('*** filterPages', page);
  if (excludes === page.path) {
    return true; // excludes page
  }
  if (!page.path.endsWith('/')) {
    console.warn(
      'Path of the page does not end with a slash! For SEO reasons all paths should end with a slash:',
      page.path,
    );
  }
  return false;
}

module.exports = {
  resolvePages,
  serialize,
  filterPages,
};
