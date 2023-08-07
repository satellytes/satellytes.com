import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { ContentfulRichText } from '../components/content/rich-text/rich-text';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

interface DataPrivacyPageQueryProps {
  contentfulPage: {
    title: string;
    content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    seoMetaText: string;
  };
}

const DataPrivacyPage = ({
  data,
  location,
}: PageProps<DataPrivacyPageQueryProps>): JSX.Element => {
  return (
    <Layout light={true}>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        description={data.contentfulPage.seoMetaText}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainer>
        <ContentfulRichText data={data.contentfulPage.content} />
      </ContentBlockContainer>
    </Layout>
  );
};

export default DataPrivacyPage;

export const DataPrivacyPageQuery = graphql`
  query ($language: String!) {
    contentfulPage(
      slug: { eq: "data-privacy" }
      node_locale: { eq: $language }
    ) {
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
