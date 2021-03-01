import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';

interface ImprintQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const ImprintPage: React.FC = () => {
  const data = useStaticQuery<ImprintQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/imprint)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title="Impressum | Satellytes Digital Consulting GmbH"
        description="Pflichtangaben nach § 5 Telemediengesetz/Impressum"
      />
      <Grid>
        <GridItem>
          <PageTitle>Impressum</PageTitle>
        </GridItem>
        <GridItem>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ImprintPage;
