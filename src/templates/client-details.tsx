import { graphql } from 'gatsby';
import React from 'react';
import ClientPage from '../components/client-page/client-page';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

interface ClientTemplateProps {
  data: {
    clientsJson: {
      name: string;
      industry: string;
      description: string;
      tasks: string[];
      techStack: string[];
      teamSize?: number;
      start: string;
      currentInvestInDays?: number;
      details?: string[];
    };
  };
}

const ClientDetailsTemplate: React.FC<ClientTemplateProps> = ({ data }) => {
  return (
    <Layout siteTitleUrl={'/clients'} transparentHeader={true}>
      <SEO title={`${data.clientsJson.name} | Satellytes`} />
      <Grid>
        <GridItem>
          <ClientPage data={data} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const CLIENT_PAGE_QUERY = graphql`
  query($linkToThePage: String) {
    clientsJson(path: { eq: $linkToThePage }) {
      industry
      currentInvestInDays
      description
      details
      name
      start
      tasks
      teamSize
      techStack
    }
  }
`;

export default ClientDetailsTemplate;
