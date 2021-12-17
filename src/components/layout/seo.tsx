import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { I18nNextData } from '../../types';

const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';

interface SeoProps {
  title: string;
  author?: string;
  publishDate?: string;
  description?: string;
  imageUrl?: string;
  siteType?: string;
  noIndex?: boolean;
  overrideLanguages?: string[] | null;
  location: Location;
}

/**
 * Help Google & friends to show the most appropriate version by language,
 * for more information: https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
 *
 * You can force a specific set of languages by passing in `overrideLanguages`
 * which is currently used to determine of a translation is available for a given job position detail
 * which we can query from personio upfront.
 *
 * Otherwise i18n-next just concludes that there is a translation as it creates a translated page
 * for every english page by default.
 *
 * The function calculates a list of meta tags from a given set of i18n-next data
 * that is available for every page.
 */
const buildAlternateMetaTags = (
  { languages, language, path, originalPath, defaultLanguage }: I18nNextData,
  host,
  overrideLanguages,
) => {
  const otherLanguages =
    overrideLanguages ?? languages.filter((item) => item !== language);

  const getUrl = (path, language) => {
    if (language === defaultLanguage) {
      return `${host}${originalPath}`;
    }
    return `${host}/${language}${originalPath}`;
  };

  const alternateLanguages = otherLanguages.map((language) => {
    const url = getUrl(originalPath, language);
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
  imageUrl,
  siteType,
  noIndex,
  overrideLanguages,
  location,
}: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            siteUrl
          }
        }
      }
    `,
  );
  const { t } = useTranslation();
  const i18n = useI18next();

  const metaDescription = description || t('main.description');
  const typeOfSite = siteType || 'website';
  const defaultImageUrl =
    site.siteMetadata.siteUrl + DEFAULT_META_IMAGE_URL_PATH;
  const metaImageUrl = imageUrl ?? defaultImageUrl;
  const alternateLanguagesMetaTags = buildAlternateMetaTags(
    i18n,
    location.origin,
    overrideLanguages,
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
      {metaImageUrl && <meta property="og:image:width" content="400" />}

      {/* Define twitters card format */}
      <meta name="twitter:card" content="summary_large_image" />

      {/*  Exclude robots if required
      Reference: https://developers.google.com/search/docs/advanced/robots/robots_meta_tag 
      */}
      {noIndex && <meta name="robots" content="noindex" />}

      {/* Alternate Links */}
      {alternateLanguagesMetaTags}
    </Helmet>
  );
};

export default SEO;
