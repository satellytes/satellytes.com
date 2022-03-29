import React from 'react';
import { Helmet } from 'react-helmet';

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
    url: 'https://www.satellytes.com',
    logo: 'https://www.satellytes.com/sy-logo.png',
    sameAs: [
      'https://www.linkedin.com/company/satellytes',
      'https://www.xing.com/companies/satellytesgmbh',
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
