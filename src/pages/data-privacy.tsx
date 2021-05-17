import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, useStaticQuery } from 'gatsby';
import { MarkdownAst } from '../components/markdown/markdown-ast';

interface DataPrivacyQuery {
  markdownRemark: {
    htmlAst: string;
  };
}

const DataPrivacyPage: React.FC = () => {
  const data = useStaticQuery<DataPrivacyQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/data-privacy)/" }) {
        htmlAst
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title="Datenschutz | Satellytes"
        description="Information über die Erhebung personenbezogener Daten"
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
