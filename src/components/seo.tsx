import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import CocoGothicBoldWoff2 from './layout/fonts/CocoGothic-Bold.woff2';
import CocoGothicWoff2 from './layout/fonts/CocoGothic.woff2';

const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/satellytes/image/upload/v1614666655/satellytes-website/logo-satellytes_asvp6p.png';

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
  const imgUrl = imageUrl || DEFAULT_IMAGE_URL;

  return (
    <Helmet
      htmlAttributes={{
        lang,
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
      {imgUrl && <meta property="image" content={imgUrl} />}
      <meta property="og:title" content={title} />
      {imgUrl && <meta property="og:image" content={imgUrl} />}
      <meta property="og:type" content={typeOfSite} />

      {/* -- Twitter Meta Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      {imgUrl && <meta name="twitter:image" content={imgUrl} />}
      {imgUrl && <meta property="twitter:image:alt" content={title} />}

      {/* -- Whatsapp --*/}
      {imgUrl && <meta property="og:image:secure_url" content={imgUrl} />}
      {imgUrl && <meta property="og:image:width" content="400" />}

      {/* -- Xing --*/}
      <meta property="og:site_name" content={title} />

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
