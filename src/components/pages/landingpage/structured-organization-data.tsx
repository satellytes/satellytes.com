import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * This adds Structured Data for the Satellytes Organization based on https://schema.org/Organization
 * to provide Information for the logo and the Google knowledge panel in general
 *
 * Read https://developers.google.com/search/docs/advanced/structured-data/logo for more information about the logo
 */
export const StructuredOrganizationData = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Satellytes Digital Consulting GmbH',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sendlinger Straße 52',
      addressLocality: 'München',
      addressRegion: 'Bayern',
      postalCode: '80331',
      addressCountry: 'DE',
    },
    email: 'info@satellytes.com',
    url: 'https://satellytes.com',
    logo: 'https://satellytes.com/sy-logo.png',
    sameAs: [
      'https://www.linkedin.com/company/satellytes',
      'https://github.com/satellytes',
      'https://twitter.com/satellytes_beep',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};
