import React from 'react';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { ContentfulRichText } from '../components/content/rich-text/rich-text';
import { ContentfulPage, ContentfulRichTextType } from '../types';

interface DataPrivacyPageQueryProps {
  contentfulPage: ContentfulPage;
  locales: LocalesQueryProps;
}

const DataPrivacyPage = ({
  data,
}: PageProps<DataPrivacyPageQueryProps>): JSX.Element => {
  return (
    <Layout light={true}>
      <ContentBlockContainer>
        <ContentfulRichText
          data={data.contentfulPage.content as ContentfulRichTextType}
        />
      </ContentBlockContainer>
    </Layout>
  );
};

export const Head = ({
  data,
  location,
}: PageProps<DataPrivacyPageQueryProps>) => {
  return (
    <SEO
      title={`${data.contentfulPage.title} | Satellytes`}
      description={data.contentfulPage.seoMetaText}
      location={location}
      noIndex={true}
      locales={data.locales}
    />
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
