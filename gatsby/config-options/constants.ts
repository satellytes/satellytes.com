import { buildNetlifyPreviewUrl } from '../util/build-netlify-preview-url';
export const RSS_FEED_URL = '/blog/rss.xml';
export const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';
export const NETLIFY_DOMAIN_NAME = process.env.GATSBY_NETLIFY_DOMAIN_NAME || '';
export const BRANCH_PREVIEW_URL = buildNetlifyPreviewUrl({
  domainName: NETLIFY_DOMAIN_NAME,
  branch: process.env.BRANCH,
  previewId: process.env.PREVIEW_ID,
});

// either use a branch preview url if any
export const BASE_URL =
  BRANCH_PREVIEW_URL || process.env.GATBSY_BASE_URL || 'http://localhost:8000';

export const LANGUAGES = ['en', 'de'];
export const DEFAULT_LANGUAGE = 'en';

// excluded urls for sitemap and robots.txt
export const SEO_EXCLUDED_URLS = [
  '/imprint/',
  '/data-privacy/',
  '/de/imprint/',
  '/de/data-privacy/',
  '/**/404/',
  '/de/404/',
  '/**/404.html',
  '/de/404.html',
  '/blog/page/',
];
