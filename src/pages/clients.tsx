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
import { SpaceShuttle } from '../components/icons/illustrations/space-shuttle';

interface ClientPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
  location: Location;
}

const ClientsPage = ({ data, location }: ClientPageProps) => {
  const { t } = useTranslation();
  const leadbox = {
    title: t('services.leadbox.title'),
    subtitle: t('services.leadbox.subtitle'),
    text: t('services.leadbox.text'),
    mail: t('services.leadbox.mail'),
    icon: <SpaceShuttle />,
  };

  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true} leadbox={leadbox}>
        <SEO
          title={`${t('clients.title')} | Satellytes`}
          description={`${t('clients.subheading')} ${t('clients.description')}`}
          location={location}
        />
        <Grid>
          <GridItem>
            <PageTitle>{t('clients.title')}</PageTitle>
          </GridItem>
          <GridItem xs={12} md={8}>
            <LargeText as={'h2'}>{t('clients.subheading')}</LargeText>
            <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ClientsPage;

export const ClientPageQuery = graphql`
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
