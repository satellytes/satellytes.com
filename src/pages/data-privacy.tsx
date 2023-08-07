import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/layout/layout';
import { SectionHeader } from '../components/content/section-header/section-header';
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
        <SectionHeader large as={'h1'} headline={data.contentfulPage.title} />
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
  }
`;
