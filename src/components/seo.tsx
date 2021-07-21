import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import CocoGothicBoldWoff2 from './layout/fonts/CocoGothic-Bold.woff2';
import CocoGothicWoff2 from './layout/fonts/CocoGothic.woff2';
import { useI18next } from 'gatsby-plugin-react-i18next';

const DEFAULT_META_IMAGE_URL_PATH = '/sy-share-image.jpg';
const LANGUAGES = ['en', 'de'];

interface SeoProps {
  title: string;
  description?: string;
  imageUrl?: string;
  siteType?: string;
  noIndex?: boolean;
  translation?: string;
}

const SEO: React.FC<SeoProps> = ({
  description = '',
  title,
  imageUrl,
  siteType,
  noIndex,
  translation,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const typeOfSite = siteType || 'website';
  const metaImageUrl =
    imageUrl || site.siteMetadata.siteUrl + DEFAULT_META_IMAGE_URL_PATH;

  const { language } = useI18next();

  let origin;
  let pathname;
  if (typeof window !== 'undefined') {
    origin = window.location.origin;
    pathname = window.location.pathname;
  }

  const prependAndAppendTrailingSlash = (path) => {
    const prependedPath = path.startsWith('/') ? path : `/${path}`;
    return prependedPath.endsWith('/') ? prependedPath : `${prependedPath}/`;
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

      {/*
       * All fonts that are linked with a preload are getting loaded before any
       * other resources, no matter if the used or not. We therefore need to
       * only list fonts that are used in almost all places.
       * Some browsers are smart enough to NOT preload different font types
       * of the same font (like woff2 and woff), but as Chrome is preloading all
       * listed font types, we will only include the most common one woff2.
       */}
      <link
        rel="preload"
        as="font"
        href={CocoGothicWoff2}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        href={CocoGothicBoldWoff2}
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {origin &&
        pathname &&
        LANGUAGES.map((lang) => {
          const href = `${origin}${lang === 'en' ? '' : `/${lang}`}`;
          pathname =
            language !== lang && translation
              ? prependAndAppendTrailingSlash(translation)
              : pathname;
          return (
            <link
              rel="alternate"
              href={href.concat(pathname)}
              hrefLang={lang}
              key={lang}
            />
          );
        })}
    </Helmet>
  );
};

export default SEO;
