import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import SEO from '../components/seo';
import Layout from '../components/layout/layout';
import { Grid, GridItem } from '../components/grid/grid';
import { PageTitle, Text } from '../components/typography/typography';
import { BlogCard } from '../components/cards/blog-card';
import { formatDate } from '../components/util/format-date';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { LocalesQuery } from './index';
import { ButtonText, SendButton } from '../components/form/controls';
import { RightArrowIcon } from '../components/icons/buttons-icons/right-arrow';

const TOP_POST_COUNT = 2;

interface AllBlogPostsQuery {
  nodes: {
    id: string;
    excerpt: string;
    frontmatter: {
      date: string;
      path: string;
      title: string;
      featuredImage: IGatsbyImageData;
    };
    rawMarkdownBody: string;
  }[];
  blogPlaceholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface BlogPageProps {
  data: {
    locales: LocalesQuery;
    allMarkdownRemark: AllBlogPostsQuery;
  };
}

const BlogPageTitle = styled(PageTitle)`
  margin-bottom: 40px;
`;

const BlogPageSubTitle = styled(Text)`
  margin-bottom: 40px;
  white-space: pre-line;
`;

const BlogPage = ({ data }: BlogPageProps) => {
  const { t } = useTranslation();
  const blogPosts = data.allMarkdownRemark.nodes;
  const { language, changeLanguage } = useI18next();

  const onClick = (event) => {
    event.preventDefault();
    changeLanguage('en');
  };

  return (
    <Layout light showLanguageSwitch={false}>
      <SEO title="Blog | Satellytes" />
      <Grid center>
        <GridItem>
          <BlogPageTitle>{t('navigation.blog')}</BlogPageTitle>
        </GridItem>
        <GridItem md={8}>
          <BlogPageSubTitle>{t('blog.info')}</BlogPageSubTitle>
          {language != 'en' && <OnlyEnglishInfo onClick={onClick} />}
        </GridItem>
      </Grid>
      {language == 'en' && <BlogPostOverview blogPosts={blogPosts} />}
    </Layout>
  );
};

export default BlogPage;

const OnlyEnglishInfo = ({ onClick }) => (
  <SendButton onClick={onClick}>
    <ButtonText>Zum Blog</ButtonText> <RightArrowIcon />
  </SendButton>
);

const BlogPostOverview = ({ blogPosts }) => (
  <Grid center>
    {blogPosts.map((post, index) => {
      const topBlogPost = index < TOP_POST_COUNT;

      return (
        <BlogCard
          key={post.id}
          large={topBlogPost}
          image={getImage(post.frontmatter.featuredImage)}
          title={post.frontmatter.title}
          text={post.excerpt}
          caption={formatDate(post.frontmatter.date)}
          link={post.frontmatter.path}
        />
      );
    })}
  </Grid>
);

export const BlogPageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 500)
        frontmatter {
          date
          path
          title
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                aspectRatio: 1.77
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        rawMarkdownBody
      }
    }
  }
`;
