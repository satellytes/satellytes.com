import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { ContactPage } from '../components/pages/contact/contact-page';
import SEO from '../components/layout/seo';
import { ContentfulPage } from '../types';

interface ContactPageQueryProps {
  contentfulPage: ContentfulPage;
}

const Contact = ({ data, location }: PageProps<ContactPageQueryProps>) => {
  return (
    <>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        description={data.contentfulPage.description?.description}
        location={location}
      />
      <ContactPage />
    </>
  );
};

export default Contact;

export const ContactPageQuery = graphql`
  query ($language: String!) {
    contentfulPage(slug: { eq: "contact" }, node_locale: { eq: $language }) {
      title
      description {
        description
      }
    }

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
