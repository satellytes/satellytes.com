import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import { ContactPage } from '../page-building/contact/contact-page';
import SEO from '../new-components/layout/seo';

interface ContactPageProps {
  location: Location;
}

const Contact = ({ location }: ContactPageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={`${t('contact.title')} | Satellytes`}
        description={t('contact.info')}
        location={location}
      />
      <ContactPage />
    </>
  );
};

export default Contact;

export const ContactPageQuery = graphql`
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
