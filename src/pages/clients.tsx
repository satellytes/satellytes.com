import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';

interface ClientsQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const ClientsPage: React.FC = () => {
  const data = useStaticQuery<ClientsQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/clients)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Kunden" />
      <Grid>
        <GridItem>
          <PageTitle>Kunden</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ClientsPage;
