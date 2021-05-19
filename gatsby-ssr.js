import React from 'react';

export const onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
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

  const link = React.createElement('link', {
    key: 'leaflet',
    rel: 'stylesheet',
    href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css',
    crossOrigin: '',
  });

  setHeadComponents([link]);
};
