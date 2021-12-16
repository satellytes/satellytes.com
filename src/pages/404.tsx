import React from 'react';
import SEO from '../new-components/layout/seo';
import { graphql } from 'gatsby';
import { SectionHeader } from '../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../new-components/layout/layout';
import { ContentBlockContainer } from '../new-components/layout/content-block-container';

interface NotFoundPageProps {
  location: Location;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  location,
}: NotFoundPageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title="404: Not found | Satellytes" location={location} />
      <Layout light={true}>
        <ContentBlockContainer>
          <SectionHeader headline={'404'}>{t('404')}</SectionHeader>
        </ContentBlockContainer>
      </Layout>
    </>
  );
};

export default NotFoundPage;

export const NotFoundPageQuery = graphql`
  query ($language: String!) {
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
