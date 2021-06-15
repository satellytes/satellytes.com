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
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { HeroImage } from '../components/hero-image/hero-image';

interface BlogArticleTemplateProps {
  data: {
    markdownRemark: {
      excerpt: string;
      htmlAst;
      fields: {
        socialCard: string;
        readingTime: {
          minutes: string;
        };
      };
      frontmatter: {
        attribution: {
          creator: string;
          source: string;
          license?: string;
        };
        date: string;
        title: string;
        image?: string;
        author?: string;
        authorSummary?: string;
        shortSummary?: string;
        featuredImage: IGatsbyImageData;
        featuredImageSquared: IGatsbyImageData;
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

const BlogHeader = ({ readingTime, frontmatter }) => {
  const readingTimeFormatted = `${Math.ceil(readingTime)}min read`;

  return (
    <BlogHeaderContainer>
      <BlogPostTitle as="h1">{frontmatter.title}</BlogPostTitle>
      <Byline
        readingTime={readingTimeFormatted}
        author={frontmatter.author}
        date={parseISO(frontmatter.date)}
        authorSummary={frontmatter.authorSummary}
      />
    </BlogHeaderContainer>
  );
};

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({ data }) => {
  const markdown = data.markdownRemark;

  const {
    featuredImage,
    featuredImageSquared,
    attribution,
  } = data.markdownRemark.frontmatter;

  const heroImage = (
    <HeroImage
      attribution={attribution}
      wideImage={getImage(featuredImage)!}
      squareImage={getImage(featuredImageSquared)!}
    />
  );
  return (
    <Layout transparentHeader siteTitleUrl={'/blog'} light hero={heroImage}>
      {/*
       * SEO Notes:
       * Recommended meta description length these days is 120 - 158 characters. The lower number is relevant for mobile devices.
       * This means authored blog posts should always come with an explicit 120 character summary (`shortSummary`). In case an author doesn't provide such a summary
       * we will fallback to a generated excerpt fixed to the 158 characters to provide a little bit more text as the automatic extraction is usually
       * less condense in terms of content.
       */}
      <SEO
        title={`${markdown.frontmatter.title} | Satellytes`}
        imageUrl={markdown.fields?.socialCard}
        siteType="article"
        description={markdown.frontmatter.shortSummary ?? markdown.excerpt}
      />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <BlogHeader
            readingTime={markdown.fields.readingTime.minutes}
            frontmatter={markdown.frontmatter}
          />
          <MarkdownAst htmlAst={markdown.htmlAst} />
          <SharePanel title={markdown.frontmatter.title} />
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
        readingTime {
          minutes
        }
      }
      excerpt(pruneLength: 158)
      frontmatter {
        attribution {
          creator
          source
        }
        date
        path
        title
        author
        authorSummary
        shortSummary

        featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 2.5
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }

        featuredImageSquared: featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      rawMarkdownBody
    }
  }
`;

export default BlogArticleTemplate;
