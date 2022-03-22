import React from 'react';
import { Helmet } from 'react-helmet';
import { SyPersonioJob } from '../../../types';

interface CareerDetailsStructuredData {
  position: SyPersonioJob;
}

const convertScheduleToEmploymentType = (schedule: string): string => {
  return schedule.toUpperCase().replace('-', '_');
};

const concatDescription = (position: SyPersonioJob): string => {
  return (
    position.short +
    '<br>' +
    position.sections
      .map((section) => `${section.headline} <br> ${section.descriptionHtml}`)
      .join('<br>')
  );
};

export const CareerDetailsStructuredData = ({
  position,
}: CareerDetailsStructuredData) => {
  const employmentType = convertScheduleToEmploymentType(position.schedule);

  const data = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: position.name,
    datePosted: position.createdAt,
    description: concatDescription(position),
    identifier: {
      '@type': 'PropertyValue',
      name: 'Satellytes Digital Consulting GmbH',
      value: '338504-41230',
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Satellytes Digital Consulting GmbH',
      sameAs: 'http://www.satellytes.com',
      logo: 'https://we-are-hiring.cdn.personio.de/logos/41230/social/6ca8f29950517ac39fcae0d6545a1fe6.png',
    },

    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sendlinger Stra\u00dfe 52',
        addressLocality: 'M\u00fcnchen',
        addressRegion: 'Bayern',
        postalCode: '80331',
        addressCountry: 'DE',
      },
    },
    jobLocationType: 'TELECOMMUTE',
    employmentType: employmentType,
    directApply: true,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};
