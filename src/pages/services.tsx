import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { Service } from '../components/pages/service/service';
import {
  ContentfulLeadBox,
  ContentfulList,
  ContentfulPage,
  ContentfulSectionHeader,
} from '../types';

interface ServicesPageQueryProps {
  contentfulPage: ContentfulPage;
  contentfulLeadbox: ContentfulLeadBox;
  servicesHeader: ContentfulSectionHeader;
  platformsHeader: ContentfulSectionHeader;
  productsServicesHeader: ContentfulSectionHeader;
  consultingHeader: ContentfulSectionHeader;
  productDesignHeader: ContentfulSectionHeader;
  platformsList: ContentfulList;
  productsServicesList: ContentfulList;
  consultingList: ContentfulList;
}

const ServicesPage = ({
  data,
  location,
}: PageProps<ServicesPageQueryProps>) => {
  return (
    <>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        location={location}
      />
      <Service
        page={data.contentfulPage}
        leadbox={data.contentfulLeadbox}
        servicesHeader={data.servicesHeader}
        platformsHeader={data.platformsHeader}
        productsServicesHeader={data.productsServicesHeader}
        consultingHeader={data.consultingHeader}
        productDesignHeader={data.productDesignHeader}
        platformsList={data.platformsList}
        productsServicesList={data.productsServicesList}
        consultingList={data.consultingList}
      />
    </>
  );
};

export default ServicesPage;

export const ServicesPageQuery = graphql`
  query ($language: String!) {
    contentfulPage(slug: { eq: "services" }, node_locale: { eq: $language }) {
      title
      description {
        description
      }
    }

    contentfulLeadbox(
      slug: { eq: "services-leadbox" }
      node_locale: { eq: $language }
    ) {
      title
      illustration
      contact {
        headline
        title
        email
      }
    }

    servicesHeader: contentfulSectionHeader(
      slug: { eq: "services-introduction" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    platformsHeader: contentfulSectionHeader(
      slug: { eq: "services-platforms" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      illustration
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    productsServicesHeader: contentfulSectionHeader(
      slug: { eq: "services-products-services" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      illustration
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    consultingHeader: contentfulSectionHeader(
      slug: { eq: "services-consulting" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      illustration
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    productDesignHeader: contentfulSectionHeader(
      slug: { eq: "services-product-design" }
      node_locale: { eq: $language }
    ) {
      kicker
      headline
      illustration
      paragraphs {
        paragraph {
          paragraph
        }
      }
    }

    platformsList: contentfulList(
      slug: { eq: "services-platforms" }
      node_locale: { eq: $language }
    ) {
      listItems
    }

    productsServicesList: contentfulList(
      slug: { eq: "services-products-services" }
      node_locale: { eq: $language }
    ) {
      listItems
    }

    consultingList: contentfulList(
      slug: { eq: "services-consulting" }
      node_locale: { eq: $language }
    ) {
      listItems
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
