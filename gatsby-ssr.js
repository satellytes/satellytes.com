import React from 'react';

export const onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
  setHeadComponents(
    [
      /**
       * All fonts that are linked with a preload are getting loaded before any
       * other resources, no matter if the used or not (even if they are available
       * locally, they are getting loaded). We therefore only list fonts
       * that are used in almost all places.
       *
       * Font-format: Some browsers are smart enough to NOT preload different font types
       * of the same font (like woff2 and woff), but as Chrome is preloading all
       * listed font types, we will only include the most common one woff2.
       *
       */
      <link
        key="preload-regular"
        rel="preload"
        as="font"
        href="/fonts/CocoGothic.woff2"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link
        key="preload-bold"
        rel="preload"
        as="font"
        href="/fonts/CocoGothic-Bold.woff2"
        type="font/woff2"
        crossOrigin="anonymous"
      />,
      <link key={'fonts-css'} rel="stylesheet" href="/fonts/fonts.css" />,
    ].filter(Boolean),
  );

  setPostBodyComponents([
    <script
      key="panelbear-analytics-src"
      async
      src={'https://cdn.panelbear.com/analytics.js?site=Lc6SV3veva9'}
    />,
    <script
      key="panelbear-analytics-code"
      async
      dangerouslySetInnerHTML={{
        __html: `
          window.panelbear = window.panelbear || function() { (window.panelbear.q = window.panelbear.q || []).push(arguments); };
          panelbear('config', {
              site: 'Lc6SV3veva9',
              spaMode: 'history',
              debug: false,
          });
        `,
      }}
    />,
  ]);
};
