import { graphql, PageProps } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { DEFAULT_LANGUAGE } from '../../gatsby/config-options/constants';
import SEO, { LocalesQueryProps } from '../components/layout/seo';
import { BlogPostPage } from '../components/pages/blog-post/blog-post';
import {
  BreadcrumbEntry,
  ContentfulBlogPost,
  ContentfulLeadBox,
} from '../types';

interface BlogArticleTemplateQueryProps {
  contentfulBlogPost: BlogArticleQueryData;
  contentfulLeadbox: ContentfulLeadBox;
  locales: LocalesQueryProps;
}

const BlogArticleTemplate = ({
  data,
  location,
}: PageProps<BlogArticleTemplateQueryProps>): JSX.Element => {
  const { title } = data.contentfulBlogPost;
  const { t } = useTranslation();

  const breadcrumb: BreadcrumbEntry[] = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
    { pathname: location.pathname, label: title },
  ];

  return (
    <BlogPostPage
      blogPost={data.contentfulBlogPost}
      breadcrumb={breadcrumb}
      contentfulLeadbox={data.contentfulLeadbox}
    />
  );
};

export const Head = ({
  data,
  location,
}: PageProps<BlogArticleTemplateQueryProps>) => {
  const { author, seoMetaText, title, publicationDate, heroImage } =
    data.contentfulBlogPost;

  let shareImagePath = '';
  if (heroImage && heroImage.shareImage && heroImage.shareImage.resize) {
    shareImagePath = heroImage.shareImage.resize.src;
  }
  /*
   * SEO Notes:
   * Recommended meta description length these days is 120 - 158 characters. The lower number is relevant for mobile devices.
   * This means authored blog posts should always come with an explicit 120 character summary (`seoMetaText`). In case an author doesn't provide such a summary
   * we will fallback to a generated excerpt fixed to the 158 characters to provide a little bit more text as the automatic extraction is usually
   * less condense in terms of content.
   */
  return (
    <SEO
      title={`${title} | Satellytes`}
      author={author.fullName}
      publishDate={publicationDate}
      shareImagePath={shareImagePath}
      siteType="article"
      description={seoMetaText}
      location={location}
      rssLink
      locales={data.locales}
      languages={[DEFAULT_LANGUAGE]}
    />
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
        naturalHeight
        fullImage: image {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        shareImage: image {
          resize(width: 1440, height: 760) {
            src
          }
        }
      }
      introRichText {
        raw
      }
      content {
        ...contentfulRichText
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

    contentfulLeadbox(
      slug: { eq: "blog-leadbox" }
      node_locale: { eq: $language }
    ) {
      title
      illustration
      link {
        title
        href
      }
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
    shareImage: {
      resize: {
        src: string;
      };
    };
  };
};

export default BlogArticleTemplate;
