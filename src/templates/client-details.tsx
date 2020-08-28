import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';

interface ClientTemplateProps {
  data: {
    clientsJson: {
      name: string;
      industry: string;
      description?: string;
      tasks?: string[];
      techStack?: string[];
      teamSize?: number;
      start?: Date;
      currentInvestInDays?: number;
      details?: string[];
    };
  };
}

const ClientDetailsTemplate: React.FC<ClientTemplateProps> = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Client details" />
      <Grid>
        <GridItem>
          <PageTitle> {data.clientsJson.name}</PageTitle>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const CLIENT_PAGE_QUERY = graphql`
  query {
    clientsJson {
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

/*
 query($link: String!) {
    clientsJson(link: { eq: $link }) {
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
 */
