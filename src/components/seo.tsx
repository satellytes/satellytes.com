import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import CocoGothicBoldWoff2 from './layout/fonts/CocoGothic-Bold.woff2';
import CocoGothicWoff2 from './layout/fonts/CocoGothic.woff2';
import { transformCloudinaryUrl } from './util/cloudinary-util';

interface SeoProps {
  title: string;
  description?: string;
  lang?: string;
  imageUrl?: string;
  siteType?: string;
}

const SEO: React.FC<SeoProps> = ({
  description = '',
  lang = 'de',
  title,
  imageUrl,
  siteType,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const typeOfSite = siteType || 'website';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* -- Primary tags -- */}
      <meta name="title" property="name" content={title} />
      <meta
        name="description"
        property="og:description"
        content={metaDescription}
      />
      {imageUrl && (
        <meta
          property="image"
          content={transformCloudinaryUrl(imageUrl, 300)}
        />
      )}
      <meta property="og:title" content={title} />
      {imageUrl && (
        <meta
          property="og:image"
          content={transformCloudinaryUrl(imageUrl, 300)}
        />
      )}
      <meta property="og:type" content={typeOfSite} />

      {/* -- Twitter Meta Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && <meta property="twitter:image:alt" content={title} />}

      {/* -- Whatsapp --*/}
      {imageUrl && (
        <meta
          property="og:image:secure_url"
          content={transformCloudinaryUrl(imageUrl, 300)}
        />
      )}
      {imageUrl && <meta property="og:image:width" content="300" />}

      {/* -- Xing --*/}
      <meta property="og:site_name" content={metaDescription} />

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
    </Helmet>
  );
};

export default SEO;
