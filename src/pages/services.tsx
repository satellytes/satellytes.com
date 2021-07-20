import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';

interface ServicePageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
}

const ServicesPage = ({ data }: ServicePageProps) => {
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true}>
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

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/(pages/services)/" }) {
      htmlAst
    }
  }
`;
