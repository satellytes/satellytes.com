import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/layout/seo';
import { BlogPostPage } from '../components/pages/blog-post/blog-post';
import { BreadcrumbEntry, ContentfulBlogPost } from '../types';

interface BlogArticleTemplateQueryProps {
  contentfulBlogPost: BlogArticleQueryData;
}

const BlogArticleTemplate = ({
  data,
  location,
}: PageProps<BlogArticleTemplateQueryProps>): JSX.Element => {
  const { author, seoMetaText, title, publicationDate, heroImage } =
    data.contentfulBlogPost;
  const { t } = useTranslation();

  const shareImagePath = heroImage.shareImage.resize.src;

  const breadcrumb: BreadcrumbEntry[] = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
    { pathname: location.pathname, label: title },
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
        title={`${title} | Satellytes`}
        author={author.fullName}
        publishDate={publicationDate}
        shareImagePath={shareImagePath}
        siteType="article"
        description={seoMetaText}
        location={location}
      />

      <BlogPostPage
        blogPost={data.contentfulBlogPost}
        breadcrumb={breadcrumb}
      />
    </>
  );
};

export const BlogPostPageQuery = graphql`
  query ($language: String!, $id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      author {
        fullName
        summary
      }
      id
      title
      heroImage {
        creator
        source
        fullImage: image {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        squaredImage: image {
          gatsbyImageData(
            aspectRatio: 1
            layout: FULL_WIDTH
            placeholder: BLURRED
          )
        }
        shareImage: image {
          resize(width: 1440, height: 760) {
            src
          }
        }
      }
      content {
        raw
        references {
          ... on ContentfulCodeBlock {
            contentful_id
            __typename
            description
            language
            code {
              code
              childMarkdownRemark {
                htmlAst
              }
            }
          }
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1440)
            __typename
          }
        }
      }
      publicationDate
      readingTime {
        minutes
      }
      slug
      seoMetaText
      teaserText
      leadBoxText
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

export type BlogArticleQueryData = ContentfulBlogPost & {
  code: {
    childMarkdownRemark: {
      htmlAst: any;
    };
  };
  readingTime: {
    minutes: number;
  };
  heroImage: {
    fullImage: IGatsbyImageData;
    squaredImage: IGatsbyImageData;
    shareImage: {
      resize: {
        src: string;
      };
    };
  };
};

export default BlogArticleTemplate;
