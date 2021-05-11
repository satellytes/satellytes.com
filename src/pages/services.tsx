import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';

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
            <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ServicesPage;
