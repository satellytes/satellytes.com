import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Service } from '../components/pages/service/service';

const ServicesPage = ({ location }: PageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={`${t('services.hero')} | Satellytes`} location={location} />
      <Service />
    </>
  );
};

export default ServicesPage;

export const ServicesPageQuery = graphql`
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
