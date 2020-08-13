import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import CocoGothicWoff2 from './layout/fonts/CocoGothic.woff2';
import CocoGothicBoldWoff2 from './layout/fonts/CocoGothic-Bold.woff2';

interface SeoProps {
  title: string;
  description?: string;
  lang?: string;
  image?: string;
}

// todo: make this component nice

const SEO: React.FC<SeoProps> = ({
  description = '',
  lang = 'de',
  title,
  image,
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
      {image && <meta property="image" content={image} />}
      {image && <meta itemProp="image" content={image} />}

      {/* -- Facebook Meta Tags -- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {image && <meta property="og:image" content={image} />}

      {/* -- Twitter Meta Tags -- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      {image && <meta name="twitter:image" content={image} />}
      {image && <meta property="twitter:image:alt" content={title} />}

      {/* -- Whatsapp --*/}
      {image && <meta property="og:image:secure_url" content={image} />}
      {image && <meta property="og:image:width" content="256" />}
      {image && <meta property="og:image:height" content="256" />}

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
