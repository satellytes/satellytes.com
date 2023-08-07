import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { ContentfulRichText } from '../components/content/rich-text/rich-text';
import { ContentfulPage, ContentfulRichTextType } from '../types';

interface ImprintPageQueryProps {
  contentfulPage: ContentfulPage;
}

const ImprintPage = ({ data, location }: PageProps<ImprintPageQueryProps>) => {
  return (
    <Layout light={true}>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        description={data.contentfulPage.seoMetaText}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainer>
        <ContentfulRichText
          data={data.contentfulPage.content as ContentfulRichTextType}
        />
      </ContentBlockContainer>
    </Layout>
  );
};

export default ImprintPage;

export const ImprintPageQuery = graphql`
  query ($language: String!) {
    contentfulPage(slug: { eq: "imprint" }, node_locale: { eq: $language }) {
      title
      content {
        raw
      }
      seoMetaText
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
