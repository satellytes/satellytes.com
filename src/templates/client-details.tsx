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
      description?: string;
      tasks: string[];
      techStack: string[];
      teamSize?: number;
      start: string;
      currentInvestInDays?: number;
      details?: string[];
    };
    markdownRemark: {
      rawMarkdownBody: string;
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
    markdownRemark(frontmatter: { path: { eq: $linkToThePage } }) {
      frontmatter {
        path
      }
      rawMarkdownBody
    }
  }
`;

export default ClientDetailsTemplate;
