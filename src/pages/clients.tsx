import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';

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
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout>
        <SEO
          title="Kunden | Satellytes"
          description="Wir unterstützen große Konzerne bei der Umsetzung ihrer digitalen Strategien. Finden Sie heraus für welche Kunden & Branchen wir tätig sind."
        />
        <Grid>
          <GridItem>
            <PageTitle>Kunden</PageTitle>
          </GridItem>
          <GridItem xs={12} md={8}>
            <LargeText as={'h2'}>
              Wir unterstützen große Konzerne bei der Umsetzung ihrer digitalen
              Strategien.
            </LargeText>
            <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ClientsPage;
