import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface DataPrivacyPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
}

const DataPrivacyPage = ({ data }: DataPrivacyPageProps) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title="Datenschutz | Satellytes"
        description="Information über die Erhebung personenbezogener Daten"
        noIndex={true}
      />
      <Grid>
        <GridItem>
          <PageTitle>{t('navigation.data-privacy')}</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
        </GridItem>
      </Grid>
    </Layout>
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
