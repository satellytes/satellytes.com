import React from 'react';
import { ContentfulVacancy } from '../../../types';
import { JobPosting, WithContext } from 'schema-dts';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { renderToString } from 'react-dom/server';

interface CareerDetailsStructuredDataProps {
  position: ContentfulVacancy;
}

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
const generateHtmlDescription = (position: ContentfulVacancy): string => {
  const richText = renderRichText(position.content, {});
  return renderToString(
    <>
      {position.shortDescription.shortDescription}
      <br />
      {richText}
    </>,
  );
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
      value: position.id,
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Satellytes Digital Consulting GmbH',
      sameAs: 'https://satellytes.com',
      logo: 'https://satellytes.com/sy-logo.png',
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
      '@type': 'Country',
      name: 'DE',
    },
    employmentType: position.schedule,
    directApply: true,
  };

  return (
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  );
};
