import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { graphql } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';
import { SectionTitle } from '../components/typography/typography';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import Byline from '../components/byline/byline';
import parseISO from 'date-fns/parseISO';
import SharePanel from '../components/share-panel/share-panel';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string;
        title: string;
        image?: string;
        author?: string;
        authorSummary?: string;
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
          {data.markdownRemark.frontmatter.authorSummary &&
            data.markdownRemark.frontmatter.author && (
              <Byline
                author={data.markdownRemark.frontmatter.author}
                date={parseISO(data.markdownRemark.frontmatter.date)}
                authorSummary={data.markdownRemark.frontmatter.authorSummary}
              />
            )}
          <Markdown data={data.markdownRemark.rawMarkdownBody} />
          <SharePanel />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const BLOG_POST_PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date
        path
        title
        image
        author
        authorSummary
      }
      rawMarkdownBody
    }
  }
`;

export default BlogArticleTemplate;
