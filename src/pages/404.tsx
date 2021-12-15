import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { SectionHeader } from '../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LayoutV2 } from '../components/layout/layout-v2';
import { ContentBlockContainer } from '../components/layout/content-block-container';

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
      <LayoutV2 light={true}>
        <ContentBlockContainer>
          <SectionHeader headline={'404'}>{t('404')}</SectionHeader>
        </ContentBlockContainer>
      </LayoutV2>
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
