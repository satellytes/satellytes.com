import React from 'react';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { ContentfulRichText } from '../components/content/rich-text/rich-text';
import { ContentfulPage, ContentfulRichTextType } from '../types';
import { Button } from '../components/ui/buttons/button';
import { useTranslation } from 'react-i18next';
import Callout from '../components/ui/callout/callout';
import styled from 'styled-components';

interface DataPrivacyPageQueryProps {
  contentfulPage: ContentfulPage;
  locales: LocalesQueryProps;
}

const StyledText = styled.p`
  margin: 0;
  margin-bottom: 16px;
`;

const DataPrivacyPage = ({
  data,
}: PageProps<DataPrivacyPageQueryProps>): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Layout light={true}>
      <ContentBlockContainer>
        <Callout illustration="selfOrganization_066">
          <StyledText>{t('dataprivacy.cookie-consent-notice')}</StyledText>
          <Button type="button" data-cc="show-preferencesModal">
            {t('dataprivacy.reopen-cookie-consent')}
          </Button>
        </Callout>
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
