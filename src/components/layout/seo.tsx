import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { I18nNextData } from '../../types';

const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';
const RSS_URL = 'https://satellytes.com/blog/rss.xml';
const RSS_TITLE = 'Satellytes Blog';

interface SeoProps {
  title: string;
  author?: string;
  publishDate?: string;
  description?: string;
  shareImagePath?: string;
  siteType?: string;
  noIndex?: boolean;
  location: Location;
  rssLink?: boolean;
}

/**
 * Help Google & friends to show the most appropriate version by language,
 * for more information: https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
 *
 * i18n-next just concludes that there is a translation as it creates a translated page
 * for every english page by default.
 *
 * The function calculates a list of meta tags from a given set of i18n-next data
 * that is available for every page.
 */
const buildAlternateMetaTags = (
  { languages, language, originalPath, defaultLanguage }: I18nNextData,
  host,
) => {
  const otherLanguages = languages.filter((item) => item !== language);

  const getUrl = (otherLanguage) => {
    if (otherLanguage === defaultLanguage) {
      return `${host}${originalPath}`;
    }
    return `${host}/${otherLanguage}${originalPath}`;
  };

  const alternateLanguages = otherLanguages.map((language) => {
    const url = getUrl(language);
    return { url, language };
  });

  return alternateLanguages.map(({ url, language }) => {
    return (
      <link rel="alternate" href={url} hrefLang={language} key={language} />
    );
  });
};

const SEO = ({
  description = '',
  title,
  author,
  publishDate,
  shareImagePath,
  siteType,
  noIndex,
  location,
  rssLink,
}: SeoProps) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
        }
      }
    }
  `);
  const { t } = useTranslation();
  const i18n = useI18next();

  const metaDescription = description || t('main.description');
  const typeOfSite = siteType || 'website';

  const metaImageUrl =
    site.siteMetadata.siteUrl + (shareImagePath ?? DEFAULT_META_IMAGE_URL_PATH);
  const alternateLanguagesMetaTags = buildAlternateMetaTags(
    i18n,
    location.origin,
  );

  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
      title={title}
    >
      {/* Standard Tags */}
      <meta property="og:title" name="title" content={title} />
      <meta
        property="og:description"
        name="description"
        content={metaDescription}
      />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content={typeOfSite} />
      <meta name="copyright" content="Satellytes" />

      {author && <meta property="article:author" content={author} />}
      {publishDate && <meta property="og:publish_date" content={publishDate} />}

      {/* Image */}
      {metaImageUrl && <meta property="og:image" content={metaImageUrl} />}
      {metaImageUrl && (
        <meta property="og:image:secure_url" content={metaImageUrl} />
      )}

      {/* Define twitters card format */}
      <meta name="twitter:card" content="summary_large_image" />

      {/*  Exclude robots if required
      Reference: https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
      */}
      {noIndex && <meta name="robots" content="noindex" />}

      {/* Alternate Links */}
      {alternateLanguagesMetaTags}

      {/* Link RSS Feed */}
      {rssLink && (
        <link
          rel="alternate"
          type="application/rss+xml"
          title={RSS_TITLE}
          href={RSS_URL}
        />
      )}
    </Helmet>
  );
};

export default SEO;
