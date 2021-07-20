import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Text } from '../components/typography/typography';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';

const BottomNote = styled(Text)`
  margin-top: 80px;
  opacity: 0.8;
`;

interface ImprintPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
}

const ImprintPage = ({ data }: ImprintPageProps) => {
  return (
    <Layout>
      <SEO
        title="Impressum | Satellytes"
        description="Pflichtangaben nach § 5 Telemediengesetz/Impressum"
        noIndex={true}
      />
      <Grid>
        <GridItem>
          <PageTitle>Impressum</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          <BottomNote>
            Aktualisiert: 16.Juli 2020, Erstellt: 12.Sep. 2018
          </BottomNote>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ImprintPage;

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
    markdownRemark(fileAbsolutePath: { regex: "/(pages/imprint)/" }) {
      htmlAst
    }
  }
`;
