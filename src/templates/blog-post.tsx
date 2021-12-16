import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../new-components/layout/seo';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { BlogPostMarkdown, BreadcrumbEntry, LocalesQuery } from '../types';
import { BlogPostPage } from '../page-building/blog-post/blog-post';

interface BlogArticleTemplateProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: BlogPostMarkdown;
  };
  location: Location;
}

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({
  data,
  location,
}) => {
  const { t } = useTranslation();
  const markdown = data.markdownRemark;

  const breadcrumb: BreadcrumbEntry[] = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
    { pathname: location.pathname, label: markdown.frontmatter.title },
  ];

  return (
    <>
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

      <BlogPostPage markdown={markdown} breadcrumb={breadcrumb} />
    </>
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
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }

        featuredImageSquared: featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
      }
      rawMarkdownBody
    }
  }
`;

export default BlogArticleTemplate;
