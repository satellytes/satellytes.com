import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { graphql } from 'gatsby';

const NotFoundTitle = styled(SubTitle)`
  ${up('md')} {
    margin-top: 220px;
  }
`;

interface NotFoundPageProps {
  location: Location;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  location,
}: NotFoundPageProps) => (
  <Layout>
    <SEO title="404: Not found | Satellytes" location={location} />
    <Grid center>
      <GridItem xs={0} md={2} />
      <GridItem xs={12} md={8}>
        <NotFoundTitle>
          Oh sorry! Our Satellite took the wrong direction.
        </NotFoundTitle>
      </GridItem>
    </Grid>
  </Layout>
);

export default NotFoundPage;

export const NotFoundPageQuery = graphql`
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
  }
`;
