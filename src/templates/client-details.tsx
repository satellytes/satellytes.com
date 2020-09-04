import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import ClientPage from '../components/client-page/client-page';

interface ClientTemplateProps {
  data: {
    clientsJson: {
      name: string;
      industry: string;
      description?: string;
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
  console.log('certain client in clients detail', data);
  return (
    <Layout>
      <SEO title="Client details" />
      <Grid>
        <GridItem>
          <ClientPage client={data.clientsJson} />
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
