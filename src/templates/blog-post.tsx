import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string;
        title: string;
      };
      rawMarkdownBody: string;
    };
  };
}

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog article" />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <Markdown data={data.markdownRemark.rawMarkdownBody} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      rawMarkdownBody
    }
  }
`;

export default BlogArticleTemplate;
