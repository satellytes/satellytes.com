import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, useStaticQuery } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';

interface ServicesQuery {
  markdownRemark: {
    htmlAst: string;
  };
}

const ServicesPage: React.FC = () => {
  const data = useStaticQuery<ServicesQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/services)/" }) {
        htmlAst
      }
    }
  `);

  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout>
        <SEO title="Leistungen | Satellytes" />
        <Grid>
          <GridItem>
            <PageTitle>Leistungen</PageTitle>
          </GridItem>

          <GridItem xs={12} md={8}>
            <LargeText as={'h2'}>
              Satellytes – das sind ausschließlich leidenschaftliche
              Entwickler:innen und Designer:innen.
            </LargeText>
            <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ServicesPage;
