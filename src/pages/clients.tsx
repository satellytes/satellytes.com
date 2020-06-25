import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  CaptionText,
  PageTitle,
  LargeText,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import ClientImageGrid from '../components/image-grids/client-image-grid';

const ClientsPage: React.FC = () => {
  const data = useStaticQuery(query);

  return (
    <Layout>
      <SEO title="Clients" />
      <Grid>
        <GridItem xs={12} md={8}>
          <PageTitle>Clients</PageTitle>
          <LargeText>
            We are showing clients not projects since we are aiming for long
            term relationships.
          </LargeText>
          <LargeText>
            For all of the listed clients, we have done or are still doing
            (major parts of) their web applications.
          </LargeText>
          <CaptionText>Not just a set of banners or a microsite.</CaptionText>
        </GridItem>
      </Grid>
      <ClientImageGrid
        clients={clientData}
        imagePlaceholder={data.imagePlaceholder}
      />
    </Layout>
  );
};

export default ClientsPage;

const clientData = [
  { name: 'Client One', link: '/' },
  { name: 'Client Two', link: '/' },
  { name: 'Client Three', link: '/' },
  { name: 'Client Four', link: '/' },
  { name: 'Client Five', link: '/' },
];

const query = graphql`
  query {
    imagePlaceholder: file(relativePath: { regex: "/astronaut/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
