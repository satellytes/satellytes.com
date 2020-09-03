import parseISO from 'date-fns/parseISO';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import Byline from '../components/byline/byline';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import { Markdown } from '../components/markdown/markdown';
import SEO from '../components/seo';
import { SectionTitle } from '../components/typography/typography';
import SharePanel from '../components/share-panel/share-panel';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      excerpt: string;
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
      <SEO
        title={data.markdownRemark.frontmatter.title}
        imageUrl={data.markdownRemark.frontmatter.image}
        siteType="article"
        description={data.markdownRemark.excerpt}
      />
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
          <SharePanel title={data.markdownRemark.frontmatter.title} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const BLOG_POST_PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 250, truncate: true)
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
