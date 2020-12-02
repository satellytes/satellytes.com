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

const CareerPage: React.FC = () => {
  const data = useStaticQuery<CareerQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/career)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title="Karriere | Satellytes"
        description="Wir suchen Entwickler:innen aus Leidenschaft! Schaue Dir unsere offenen Stellen an. Wir freuen uns auf Deine Bewerbung."
      />
      <Grid>
        <GridItem>
          <PageTitle>Karriere</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CareerPage;
