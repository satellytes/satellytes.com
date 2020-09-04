import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import { Grid, GridItem } from '../components/grid/grid';
import ClientImageGrid from '../components/image-grids/client-image-grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  CaptionText,
  LargeText,
  PageTitle,
} from '../components/typography/typography';

interface AllClientsQuery {
  allClientsJson: {
    nodes: {
      id: string;
      name: string;
      path: string;
    }[];
  };
  imagePlaceholder: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const ClientsPage: React.FC = () => {
  const data = useStaticQuery<AllClientsQuery>(graphql`
    query getClients {
      allClientsJson {
        nodes {
          id
          name
          path
        }
      }
      imagePlaceholder: file(relativePath: { regex: "/astronaut/" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const clientsList = data.allClientsJson.nodes.map((clientItem) => {
    return {
      ...clientItem,
    };
  });

  console.log('clientsList comes from mapping', clientsList);
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
        clients={clientsList}
        imagePlaceholder={data.imagePlaceholder.childImageSharp.fluid}
      />
    </Layout>
  );
};

export default ClientsPage;
