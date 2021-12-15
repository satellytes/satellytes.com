import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LayoutV2 } from '../components/layout/layout';
import { SectionHeader } from '../new-components/section-header/section-header';
import { LocalesQuery } from '../types';
import { ContentBlockContainer } from '../components/layout/content-block-container';

interface DataPrivacyPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
  location: Location;
}

const DataPrivacyPage = ({ data, location }: DataPrivacyPageProps) => {
  const { t } = useTranslation();
  return (
    <LayoutV2 light={true}>
      <SEO
        title={`${t('data-privacy.title')} | Satellytes`}
        description={t('data-privacy.info')}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainer>
        <SectionHeader headline={t('navigation.data-privacy')} />
        <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
      </ContentBlockContainer>
    </LayoutV2>
  );
};

export default DataPrivacyPage;

export const DataPrivacyPageQuery = graphql`
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
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/data-privacy)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
    }
  }
`;
