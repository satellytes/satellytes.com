import React from 'react';
import { Helmet } from 'react-helmet';
import { SyPersonioJob } from '../../../types';
import { JobPosting, WithContext } from 'schema-dts';

interface CareerDetailsStructuredDataProps {
  position: SyPersonioJob;
}

/**
 * Convert the kebab-case, lowercase Personio values like `full-time`
 * to the expected snake_case, uppercase format `FULL_TIME`.
 */
const normalizeJobScheduleFormat = (schedule: string): string => {
  return schedule.toUpperCase().replace('-', '_');
};

/**
 * Create a full description of the job in HTML format to suite the requirements of the structured data format.
 *
 * Additional guidelines (from Google)
 *     You must format the description in HTML.
 *     At minimum, add paragraph breaks using <br>, <p>, or \n.
 *     The feature recognizes the following HTML tags: <p>, <ul>, and <li>.
 *     The feature doesn't recognize header and character-level tags, such as <h1>, <strong>, and <em>. While the tags won't affect the formatting in the feature, you can safely include them on the page.
 *
 * Reference:
 * https://developers.google.com/search/docs/advanced/structured-data/job-posting#rdescription
 */
const generateHtmlDescription = (position: SyPersonioJob): string => {
  const htmlIntro = `${position.short} <br><br>`;
  const htmlSections = position.sections
    .map((section) => `${section.headline} <br> ${section.descriptionHtml}`)
    .join('<br><br>');
  return htmlIntro + htmlSections;
};

/**
 * Create and write structured data for our given job posting based on https://schema.org/JobPosting
 *
 * See the Google guide for additional insights:
 * https://developers.google.com/search/docs/advanced/structured-data/job-posting#structured-data-type-definitions
 */
export const CareerDetailsStructuredData = ({
  position,
}: CareerDetailsStructuredDataProps) => {
  const structuredData: WithContext<JobPosting> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: position.name,
    datePosted: position.createdAt,
    description: generateHtmlDescription(position),
    identifier: {
      '@type': 'PropertyValue',
      name: 'Satellytes Digital Consulting GmbH',
      value: position.jobId,
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Satellytes Digital Consulting GmbH',
      sameAs: 'http://www.satellytes.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sendlinger Straße 52',
        addressLocality: 'München',
        addressRegion: 'Bayern',
        postalCode: '80331',
        addressCountry: 'DE',
      },
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'AdministrativeArea',
      sameAs: 'http://www.wikidata.org/entity/Q458',
      name: 'European Union',
    },
    employmentType: normalizeJobScheduleFormat(position.schedule),
    directApply: true,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
