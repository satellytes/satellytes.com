import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { ContactPage } from '../components/pages/contact/contact-page';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { ContentfulPage } from '../types';

interface ContactPageQueryProps {
  contentfulPage: ContentfulPage;
  locales: LocalesQueryProps;
}

const Contact = () => <ContactPage />;
export default Contact;

export const Head = ({ data, location }: PageProps<ContactPageQueryProps>) => {
  return (
    <>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        description={data.contentfulPage.description?.description}
        location={location}
        locales={data.locales}
      />
      {/*
       * Styles and Script for Leaflet Hero Map
       */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
      />
      <link
        rel="stylesheet"
        href="//unpkg.com/leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css"
        type="text/css"
      />
      <script src="//unpkg.com/leaflet-gesture-handling"></script>
    </>
  );
};

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
