import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, useStaticQuery } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';

interface ClientsQuery {
  markdownRemark: {
    htmlAst: string;
  };
}

const ClientsPage: React.FC = () => {
  const data = useStaticQuery<ClientsQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/clients)/" }) {
        htmlAst
      }
    }
  `);

  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true}>
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
            <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ClientsPage;
