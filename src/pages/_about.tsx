import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';

interface CareerQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const AboutPage: React.FC = () => {
  const data = useStaticQuery<CareerQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/about)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Über unsere Agentur | Satellytes" />
      <Grid>
        <GridItem>
          <PageTitle>Über unsere Agentur</PageTitle>
        </GridItem>
        <GridItem>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
