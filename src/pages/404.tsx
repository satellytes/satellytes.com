import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { SectionHeader } from '../components/content/section-header/section-header';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { Layout } from '../components/layout/layout';
import SEO from '../components/layout/seo';
import { ContentfulPage } from '../types';

interface NotFoundPageQueryProps {
  contentfulPage: ContentfulPage;
}

const NotFoundPage = ({
  data,
  location,
}: PageProps<NotFoundPageQueryProps>): JSX.Element => {
  return (
    <>
      <SEO
        title={`${data.contentfulPage.title} | Satellytes`}
        location={location}
      />
      <Layout light={true}>
        <ContentBlockContainer>
          <SectionHeader headline={'404'}>
            {data.contentfulPage.description?.description as string}
          </SectionHeader>
        </ContentBlockContainer>
      </Layout>
    </>
  );
};

export default NotFoundPage;

export const NotFoundPageQuery = graphql`
  query ($language: String!) {
    contentfulPage(slug: { eq: "not-found" }, node_locale: { eq: $language }) {
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
