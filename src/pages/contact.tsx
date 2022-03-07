import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql, PageProps } from 'gatsby';
import { ContactPage } from '../components/pages/contact/contact-page';
import SEO from '../components/layout/seo';

const Contact = ({ location }: PageProps) => {
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
