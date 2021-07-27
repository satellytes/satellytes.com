import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { ClientList } from '../components/client-list/client-list';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { BlockTeaser } from '../components/teasers/block-teaser';
import {
  PageTitle,
  Text,
  TextTitle,
} from '../components/typography/typography';
import { HEADER_HEIGHT } from '../components/header/header';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface AllClientsQuery {
  nodes: {
    start: string;
    name: string;
    nameEN: string;
    path: string;
  }[];
}

const HomePageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 92vh;
  min-height: min-content;
  margin: 0;
  padding-top: ${HEADER_HEIGHT};
  color: #ffffff;

  ${up('md')} {
    height: 100vh;
  }
`;

const HomePageBlockTeaser = styled(BlockTeaser)<{
  margin?: boolean;
}>`
  margin-bottom: ${(props) => props.margin && '160px'};
`;

const IndexPageTitle = styled(PageTitle)`
  margin-top: 0;
  margin-bottom: 16px;

  ${up('md')} {
    margin-bottom: 32px;
  }
`;

const IndexPageSubTitle = styled(TextTitle)`
  margin-top: 0;
  font-weight: 400;
`;

export interface LocalesQuery {
  edges: {
    node: {
      ns: string;
      language: string;
      data: string;
    };
  }[];
}

interface IndexPageProps {
  data: {
    locales: LocalesQuery;
    allClientsJson: AllClientsQuery;
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Aurora type={AuroraType.BrightBlue} />
      <Layout transparentHeader={true}>
        <SEO title="Satellytes" />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <HomePageTitleContainer>
              <div>
                <IndexPageTitle>Satellytes</IndexPageTitle>
                <IndexPageSubTitle as="h2">
                  We are pragmatic professionals, creating reliable software for
                  the web.
                </IndexPageSubTitle>
              </div>
            </HomePageTitleContainer>
          </GridItem>
          <GridItem xs={0} md={2} />
          <GridItem xs={0} md={1} />
          <GridItem xs={12} md={10}>
            <HomePageBlockTeaser
              margin
              preTitle={t('services.title')}
              title={t('main.services.title')}
              link={t('services.title')}
              linkTo="/services/"
            >
              <Text>{t('main.services.text')}</Text>
            </HomePageBlockTeaser>
            <HomePageBlockTeaser
              preTitle={t('clients.title')}
              title={t('main.clients.title')}
              splitView
            >
              <Text>{t('main.clients.text')}</Text>
            </HomePageBlockTeaser>
            <ClientList clients={data.allClientsJson.nodes} />
            <HomePageBlockTeaser
              preTitle={t('career.title')}
              title={t('main.career.title')}
              splitView
              link={t('career.title')}
              linkTo="/career/"
            >
              <Text>{t('main.career.text')}</Text>
            </HomePageBlockTeaser>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
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
    allClientsJson {
      nodes {
        name
        nameEN
        path
        start
      }
    }
  }
`;
