import { graphql } from 'gatsby';

export const richTextFragment = graphql`
  fragment richText on ContentfulBlogPostContent {
    raw
    references {
      ... on ContentfulCodeBlock {
        contentful_id
        __typename
        description
        code {
          code
          childMarkdownRemark {
            htmlAst
          }
        }
      }
      ... on ContentfulAsset {
        contentful_id
        description
        file {
          contentType
          url
        }
        gatsbyImageData(width: 1440)
        title
        __typename
      }

      ... on ContentfulFootnote {
        contentful_id
        __typename
        note {
          childMarkdownRemark {
            htmlAst
          }
        }
      }

      ... on ContentfulStats {
        contentful_id
        __typename
        statItems {
          label
          value
        }
      }

      ... on ContentfulAdvancedAsset {
        contentful_id
        __typename
        image {
          contentful_id
          description
          gatsbyImageData(layout: FULL_WIDTH, quality: 80)
          title
          __typename
        }
        fullWidth
      }

      ... on ContentfulBlogPostCollapsible {
        contentful_id
        __typename
        summary
        content {
          raw
          references {
            ... on ContentfulCodeBlock {
              contentful_id
              __typename
              description
              code {
                code
                childMarkdownRemark {
                  htmlAst
                }
              }
            }
            ... on ContentfulAsset {
              contentful_id
              description
              file {
                contentType
                url
              }
              gatsbyImageData(width: 1440)
              title
              __typename
            }
          }
        }
      }
    }
  }
`;
