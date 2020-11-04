import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';

interface ServicesQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const ServicesPage: React.FC = () => {
  const data = useStaticQuery<ServicesQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/services)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Dienstleistungen" />
      <Grid>
        <GridItem>
          <PageTitle>Unsere Dienstleistungen</PageTitle>
        </GridItem>
        <GridItem>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ServicesPage;
