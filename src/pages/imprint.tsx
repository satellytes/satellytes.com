import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle, Text } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { Satellite } from '../components/satellite/satellite';

interface ImprintQuery {
  markdownRemark: {
    htmlAst: string;
  };
}

const BottomNote = styled(Text)`
  margin-top: 80px;
  opacity: 0.8;
`;

const ImprintPage: React.FC = () => {
  const data = useStaticQuery<ImprintQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/imprint)/" }) {
        htmlAst
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title="Impressum | Satellytes"
        description="Pflichtangaben nach § 5 Telemediengesetz/Impressum"
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
