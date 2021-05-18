import parseISO from 'date-fns/parseISO';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import Byline from '../components/byline/byline';
import { Grid, GridItem } from '../components/grid/grid';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SectionTitle } from '../components/typography/typography';
import SharePanel from '../components/share-panel/share-panel';
import { MarkdownAst } from '../components/markdown/markdown-ast';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      excerpt: string;
      htmlAst;
      fields: {
        socialCard: string;
      };
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
  margin-bottom: 40px;
`;

const BlogHeaderContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: 80px;
    margin-bottom: 32px;
  }
`;

const BlogHeader = ({ frontmatter }) => {
  return (
    <BlogHeaderContainer>
      <BlogPostTitle as="h1">{frontmatter.title}</BlogPostTitle>
      <Byline
        author={frontmatter.author}
        date={parseISO(frontmatter.date)}
        authorSummary={frontmatter.authorSummary}
      />
    </BlogHeaderContainer>
  );
};

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({ data }) => {
  return (
    <Layout
      heroImage={data.markdownRemark.frontmatter.image}
      siteTitleUrl={'/blog'}
      light
    >
      <SEO
        title={`${data.markdownRemark.frontmatter.title} | Satellytes`}
        imageUrl={data.markdownRemark.fields?.socialCard}
        siteType="article"
        description={data.markdownRemark.excerpt}
      />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <BlogHeader frontmatter={data.markdownRemark.frontmatter} />
          <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
          <SharePanel title={data.markdownRemark.frontmatter.title} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const BLOG_POST_PAGE_QUERY = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      fields {
        socialCard
      }
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
