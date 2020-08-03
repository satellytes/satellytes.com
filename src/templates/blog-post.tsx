import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';
import { SectionTitle } from '../components/typography/typography';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string;
        title: string;
        image?: string;
      };
      rawMarkdownBody: string;
    };
  };
}

const BlogPostTitle = styled(SectionTitle)`
  margin-top: 40px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({ data }) => {
  return (
    <Layout
      heroImage={data.markdownRemark.frontmatter.image}
      siteTitleUrl={'/blog'}
    >
      <SEO title="Blog article" />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <BlogPostTitle as="h1">
            {data.markdownRemark.frontmatter.title}
          </BlogPostTitle>
          <Markdown data={data.markdownRemark.rawMarkdownBody} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const BLOG_POST_PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        image
      }
      rawMarkdownBody
    }
  }
`;

export default BlogArticleTemplate;
