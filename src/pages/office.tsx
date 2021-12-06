import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/seo';
import { OfficePage } from '../page-building/office/office-page';

interface OfficeProps {
  location: Location;
}

const Office = ({ location }: OfficeProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={`${t('office.title')} | Satellytes`} location={location} />
      <OfficePage />
    </>
  );
};

export default Office;

export const OfficePageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
