import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, useStaticQuery } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';

interface DataPrivacyQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const DataPrivacyPage: React.FC = () => {
  const data = useStaticQuery<DataPrivacyQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/data-privacy)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Datenschutz" />
      <Grid>
        <GridItem>
          <PageTitle>Datenschutz</PageTitle>
        </GridItem>
        <GridItem>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default DataPrivacyPage;
