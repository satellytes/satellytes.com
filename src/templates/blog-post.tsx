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
import SharePanel from '../components/social-panel/share-panel';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { HeroImage } from '../components/hero-image/hero-image';
import { LocalesQuery } from '../pages';
import FollowPanel from '../components/social-panel/follow-panel';
import { PageContext } from 'gatsby/internal';
import { Astronaut } from '../components/icons/illustrations/astronaut';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { LeadboxProps } from '../components/leadbox/leadbox';

interface BlogArticleTemplateProps {
  data: {
    locales: LocalesQuery;
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
        seoMetaText?: string;
        leadboxText?: string;
        featuredImage: IGatsbyImageData;
        featuredImageSquared: IGatsbyImageData;
      };
      rawMarkdownBody: string;
    };
  };
  location: Location;
  pageContext: PageContext;
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

const PanelContainer = styled.div`
  display: block;
  margin-top: 80px;

  ${up('md')} {
    display: flex;
    justify-content: space-between;
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

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({
  data,
  location,
  pageContext,
}) => {
  const markdown = data.markdownRemark;
  const {
    breadcrumb: { crumbs },
  } = pageContext;

  const { featuredImage, featuredImageSquared, attribution, leadboxText } =
    data.markdownRemark.frontmatter;
  const { t } = useI18next();

  const heroImage = (
    <HeroImage
      attribution={attribution}
      wideImage={getImage(featuredImage)!}
      squareImage={getImage(featuredImageSquared)!}
    />
  );
  const leadbox: LeadboxProps = {
    title: leadboxText || t('blogpost.leadbox.title'),
    link: t('blogpost.leadbox.link'),
    linkTo: '/career/',
    icon: <Astronaut />,
  };

  return (
    <Layout
      transparentHeader
      siteTitleUrl={'/blog'}
      light
      hero={heroImage}
      leadbox={leadbox}
      showLanguageSwitch={false}
      breadcrumb={crumbs}
      breadcrumbCustomLabel={markdown.frontmatter.title}
    >
      {/*
       * SEO Notes:
       * Recommended meta description length these days is 120 - 158 characters. The lower number is relevant for mobile devices.
       * This means authored blog posts should always come with an explicit 120 character summary (`seoMetaText`). In case an author doesn't provide such a summary
       * we will fallback to a generated excerpt fixed to the 158 characters to provide a little bit more text as the automatic extraction is usually
       * less condense in terms of content.
       */}
      <SEO
        title={`${markdown.frontmatter.title} | Satellytes`}
        imageUrl={markdown.fields?.socialCard}
        siteType="article"
        description={markdown.frontmatter.seoMetaText ?? markdown.excerpt}
        location={location}
        noTranslation={true}
      />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <BlogHeader
            readingTime={markdown.fields.readingTime.minutes}
            frontmatter={markdown.frontmatter}
          />
          <MarkdownAst htmlAst={markdown.htmlAst} />
          <PanelContainer>
            <SharePanel title={markdown.frontmatter.title} />
            <FollowPanel />
          </PanelContainer>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export const BlogPostPageQuery = graphql`
  query ($path: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
        seoMetaText
        leadboxText

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
