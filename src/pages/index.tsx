import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { Landingpage } from '../components/pages/landingpage/landingpage';
import {
  BlogPostTeaser,
  ContentfulPage,
  ContentfulSectionHeader,
  ContentfulTeaser,
  ContentfulVacancy,
} from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { StructuredOrganizationData } from '../components/pages/landingpage/structured-organization-data';

export interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

interface IndexPageQueryProps {
  contentfulPage: ContentfulPage;
  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
  allContentfulBlogPost: {
    nodes: BlogPostTeaser[];
  };
  officeImages: {
    nodes: OfficeImage[];
  };
  servicesHeader: ContentfulSectionHeader;
  careerHeader: ContentfulSectionHeader;
  servicesTeaser: ContentfulTeaser;
  blogHeader: ContentfulSectionHeader;
  locales: LocalesQueryProps;
}

const IndexPage = ({ data }: PageProps<IndexPageQueryProps>) => {
  const jobPositions = data.allContentfulVacancy.nodes;
  const blogPosts = data.allContentfulBlogPost.nodes;
  const officeImages = data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <Landingpage
      title={data.contentfulPage.title}
      description={data.contentfulPage.description?.description as string}
      officeImages={officeImages}
      positions={jobPositions}
      posts={blogPosts}
      serviceHeader={data.servicesHeader}
      serviceTeaser={data.servicesTeaser.gridItems}
      careerHeader={data.careerHeader}
      blogHeader={data.blogHeader}
    />
  );
};

export default IndexPage;

export const Head = ({ data, location }: PageProps<IndexPageQueryProps>) => {
  return (
    <>
      <SEO
        title={data.contentfulPage.title}
        location={location}
        rssLink
        locales={data.locales}
      />
      <StructuredOrganizationData />
      <script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="422b90b3-20ea-49d6-9658-9c722c5b4d97"
        data-blockingmode="auto"
        type="text/javascript"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            function loadLeadinfo() {
              (function(l,e,a,d,i,n,f,o){
                if(!l[i]){
                  l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
                  l.GlobalLeadinfoNamespace.push(i);
                  l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};
                  l[i].t=l[i].t||n;
                  l[i].q=l[i].q||[];
                  o=e.createElement(a);
                  f=e.getElementsByTagName(a)[0];
                  o.async=1;
                  o.src=d;
                  f.parentNode.insertBefore(o,f);
                }
              }(window,document,'script','https://cdn.leadinfo.eu/ping.js','leadinfo','LI-66D184CC97CFD'));
            }
            
            window.addEventListener("CookieConsentDeclaration", function() {
              var consent = window.CookieConsent.getConsent();
              if (consent && consent.marketing) {
                loadLeadinfo();
              }
            });
          `,
        }}
      />
    </>
  );
};

export const IndexPageQuery = graphql`
  query ($language: String!) {
    officeImages: allFile(filter: { relativeDirectory: { eq: "office" } }) {
      nodes {
        id
        relativePath
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }

    contentfulPage(
      slug: { eq: "landingpage" }
      node_locale: { eq: $language }
    ) {
      title
      description {
        description
      }
      seoMetaText
    }

    allContentfulVacancy(filter: { node_locale: { eq: $language } }, limit: 4) {
      nodes {
        id
        name
        shortDescription {
          shortDescription
        }
        slug
      }
    }

    allContentfulBlogPost(
      filter: { node_locale: { eq: "en" } }
      sort: { publicationDate: DESC }
      limit: 4
    ) {
      nodes {
        fields {
          path
        }
        id
        title
        teaserText
        publicationDate
        heroImage {
          image {
            gatsbyImageData(
              width: 400
              aspectRatio: 1.77
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
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

    careerHeader: contentfulSectionHeader(
      slug: { eq: "index-career" }
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

    blogHeader: contentfulSectionHeader(
      slug: { eq: "index-blog" }
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

    servicesTeaser: contentfulTeaserGrid(
      slug: { eq: "index-services" }
      node_locale: { eq: $language }
    ) {
      gridItems {
        title
        as
        illustration
        description {
          description
        }
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
