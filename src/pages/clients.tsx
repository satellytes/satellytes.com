import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { LargeText, PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { LocalesQuery } from './index';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface ClientPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
}

const ClientsPage = ({ data }: ClientPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true} showLanguageSwitch>
        <SEO
          title="Kunden | Satellytes"
          description="Wir unterstützen große Konzerne bei der Umsetzung ihrer digitalen Strategien. Finden Sie heraus für welche Kunden & Branchen wir tätig sind."
        />
        <Grid>
          <GridItem>
            <PageTitle>{t('clients.title')}</PageTitle>
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
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/clients)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
      frontmatter {
        language
      }
    }
  }
`;
