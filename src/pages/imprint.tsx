import React from 'react';
import SEO from '../components/layout/seo';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import { MarkdownAst } from '../components/legacy/markdown/markdown-ast';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../components/layout/layout';
import { SectionHeader } from '../components/content/section-header/section-header';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { TextStyles } from '../components/typography';

const BottomNote = styled.p`
  ${TextStyles.textR}

  margin-top: 80px;
  margin-bottom: 16px;
  opacity: 0.8;
`;

interface ImprintPageQueryProps {
  markdownRemark: {
    htmlAst: string;
  };
}

const ImprintPage = ({ data, location }: PageProps<ImprintPageQueryProps>) => {
  const { t } = useTranslation();
  return (
    <Layout light={true}>
      <SEO
        title={`${t('imprint.title')} | Satellytes`}
        description={t<string>('imprint.info')}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainer>
        <SectionHeader as={'h1'} headline={t('navigation.imprint')} />
        <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
        <BottomNote>{t('imprint.updated')}</BottomNote>
      </ContentBlockContainer>
    </Layout>
  );
};

export default ImprintPage;

export const ImprintPageQuery = graphql`
  query ($language: String!) {
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/imprint)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
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
