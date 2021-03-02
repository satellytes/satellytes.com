import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { Text } from '../components/typography/typography';

interface ImprintQuery {
  markdownRemark: {
    rawMarkdownBody: string;
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
        rawMarkdownBody
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
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
          <BottomNote>
            Aktualisiert: 16.Juli 2020, Erstellt: 12.Sep. 2018
          </BottomNote>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ImprintPage;
