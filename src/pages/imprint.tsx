import React from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Text } from '../legacy-components/typography';
import { MarkdownAst } from '../legacy-components/markdown/markdown-ast';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../components/layout/layout';
import { SectionHeader } from '../components/section-header/section-header';
import { LocalesQuery } from '../types';
import { ContentBlockContainer } from '../components/layout/content-block-container';

const BottomNote = styled(Text)`
  margin-top: 80px;
  opacity: 0.8;
`;

interface ImprintPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
  location: Location;
}

const ImprintPage = ({ data, location }: ImprintPageProps) => {
  const { t } = useTranslation();
  return (
    <Layout light={true}>
      <SEO
        title={`${t('imprint.title')} | Satellytes`}
        description={t('imprint.info')}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainer>
        <SectionHeader headline={t('navigation.imprint')} />
        <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
        <BottomNote>{t('imprint.updated')}</BottomNote>
      </ContentBlockContainer>
    </Layout>
  );
};

export default ImprintPage;

export const ImprintPageQuery = graphql`
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
      fileAbsolutePath: { regex: "/(pages/imprint)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
    }
  }
`;
