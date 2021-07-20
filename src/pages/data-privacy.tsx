import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';

interface DataPrivacyPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
}

const DataPrivacyPage = ({ data }: DataPrivacyPageProps) => {
  return (
    <Layout>
      <SEO
        title="Datenschutz | Satellytes"
        description="Information über die Erhebung personenbezogener Daten"
        noIndex={true}
      />
      <Grid>
        <GridItem>
          <PageTitle>Datenschutz</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default DataPrivacyPage;

export const query = graphql`
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
    markdownRemark(fileAbsolutePath: { regex: "/(pages/data-privacy)/" }) {
      htmlAst
    }
  }
`;
