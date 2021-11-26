import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';
const LANGUAGES = ['en', 'de'];

interface SeoProps {
  title: string;
  description?: string;
  imageUrl?: string;
  siteType?: string;
  noIndex?: boolean;
  noTranslation?: boolean;
  translatedPath?: string;
  location: Location;
}

const SEO: React.FC<SeoProps> = ({
  description = '',
  title,
  imageUrl,
  siteType,
  noIndex,
  translatedPath,
  noTranslation,
  location,
}) => {
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

  const metaDescription = description || t('main.description');
  const typeOfSite = siteType || 'website';
  const metaImageUrl =
    imageUrl || site.siteMetadata.siteUrl + DEFAULT_META_IMAGE_URL_PATH;

  const { language } = useI18next();

  const currentPathname = location.pathname.replace('/de', '');

  // functions returns links for each localized version of the page (en and de).
  // This will help Google to show the most appropriate version by language,
  // for more information: https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
  const listLocalizedVersions = (pathName) => {
    return LANGUAGES.map((lang) => {
      const languagePath = lang === 'en' ? '' : `/${lang}`;
      const pathNameWithSlashes =
        language !== lang && translatedPath
          ? prependAndAppendTrailingSlash(translatedPath)
          : pathName;
      const href = `${location.origin}${languagePath}${pathNameWithSlashes}`;
      return <link rel="alternate" href={href} hrefLang={lang} key={lang} />;
    });
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
    >
      {/* -- Primary tags -- */}
      <meta name="title" property="name" content={title} />
      <meta
        name="description"
        property="og:description"
        content={metaDescription}
      />
      {metaImageUrl && <meta property="image" content={metaImageUrl} />}
      <meta property="og:title" content={title} />
      {metaImageUrl && <meta property="og:image" content={metaImageUrl} />}
      <meta property="og:type" content={typeOfSite} />

      {/* -- Twitter Meta Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      {metaImageUrl && <meta name="twitter:image" content={metaImageUrl} />}
      {metaImageUrl && <meta property="twitter:image:alt" content={title} />}

      {/* -- Whatsapp --*/}
      {metaImageUrl && (
        <meta property="og:image:secure_url" content={metaImageUrl} />
      )}
      {metaImageUrl && <meta property="og:image:width" content="400" />}

      {/* -- Xing --*/}
      <meta property="og:site_name" content={title} />

      {noIndex && <meta name="robots" content="noindex" />}

      {/* -- Alternate Links --*/}
      {!noTranslation && listLocalizedVersions(currentPathname)}
    </Helmet>
  );
};

const prependAndAppendTrailingSlash = (path) => {
  const prependedPath = path.startsWith('/') ? path : `/${path}`;
  return prependedPath.endsWith('/') ? prependedPath : `${prependedPath}/`;
};

export default SEO;
