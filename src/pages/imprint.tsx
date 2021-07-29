import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Text } from '../components/typography/typography';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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
}

const ImprintPage = ({ data }: ImprintPageProps) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={`${t('imprint.title')} | Satellytes`}
        description={t('imprint.info')}
        noIndex={true}
      />
      <Grid>
        <GridItem>
          <PageTitle>{t('navigation.imprint')}</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          <BottomNote>{t('imprint.updated')}</BottomNote>
        </GridItem>
      </Grid>
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
