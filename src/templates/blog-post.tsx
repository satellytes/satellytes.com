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
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useMediaQuery } from '../components/util/use-media-query';

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

const BlogHero = ({ wideImage, squareImage }) => {
  const heroImage = <GatsbyImage alt={''} image={wideImage} />;
  const heroImageSquared = <GatsbyImage alt={''} image={squareImage} />;
  /**
   * A screen is tall once the height is larger then the width, which means the aspect ratio dips below 1 (0-1)
   */
  const tallScreen = useMediaQuery(`(max-aspect-ratio: 0.75)`);
  if (tallScreen) {
    return heroImageSquared;
  } else {
    return heroImage;
  }
};

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({ data }) => {
  const markdown = data.markdownRemark;

  const {
    featuredImage,
    featuredImageSquared,
  } = data.markdownRemark.frontmatter;

  const heroImage = (
    <BlogHero
      wideImage={getImage(featuredImage)!}
      squareImage={getImage(featuredImageSquared)!}
    />
  );

  return (
    <Layout siteTitleUrl={'/blog'} light hero={heroImage}>
      <SEO
        title={`${markdown.frontmatter.title} | Satellytes`}
        imageUrl={markdown.fields?.socialCard}
        siteType="article"
        description={markdown.excerpt}
      />

      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <BlogHeader frontmatter={markdown.frontmatter} />
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
      }
      frontmatter {
        date
        path
        title
        author
        authorSummary

        featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.85
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
