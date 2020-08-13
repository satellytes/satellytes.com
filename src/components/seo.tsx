import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import CocoGothicWoff2 from './layout/fonts/CocoGothic.woff2';
import CocoGothicBoldWoff2 from './layout/fonts/CocoGothic-Bold.woff2';

interface SeoProps {
  title: string;
  description?: string;
  lang?: string;
  meta?: [any];
  image?: string;
}

// todo: make this component nice

const SEO: React.FC<SeoProps> = ({
  description = '',
  lang = 'de',
  meta = [],
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
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },

        //Google block:
        {
          itemprop: `name`,
          content: title,
        },
        {
          itemprop: `description`,
          content: metaDescription,
        },
        {
          itemprop: `image`,
          content: image,
        },

        //facebook block:
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },

        //twitter block:
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {/* if image exist*/}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content={`300px`} />}
      {image && <meta property="og:image:height" content={`300px`} />}
      {image && <meta name="twitter:image" content={image}></meta>}

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
