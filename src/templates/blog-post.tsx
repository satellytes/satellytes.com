import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { BlogPostMarkdown, BreadcrumbEntry } from '../types';
import { BlogPostPage } from '../components/pages/blog-post/blog-post';

interface BlogArticleTemplateQueryProps {
  markdownRemark: BlogPostMarkdown;
}

const BlogArticleTemplate = ({
  data,
  location,
}: PageProps<BlogArticleTemplateQueryProps>): JSX.Element => {
  const { t } = useTranslation();
  const markdown = data.markdownRemark;

  const shareImagePath =
    markdown.frontmatter.shareImage.childImageSharp.fixed.src;

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
        author={markdown.frontmatter.author}
        publishDate={markdown.frontmatter.date}
        shareImagePath={shareImagePath}
        siteType="article"
        description={markdown.frontmatter.seoMetaText ?? markdown.excerpt}
        location={location}
      />

      <BlogPostPage markdown={markdown} breadcrumb={breadcrumb} />
    </>
  );
};

export const BlogPostPageQuery = graphql`
  query ($path: String!, $language: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      readingTime {
        minutes
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
              transformOptions: { fit: COVER, cropFocus: NORTH }
            )
          }
        }

        shareImage: featuredImage {
          childImageSharp {
            fixed(width: 1440, height: 760) {
              src
            }
          }
        }
      }
      rawMarkdownBody
    }

    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default BlogArticleTemplate;
