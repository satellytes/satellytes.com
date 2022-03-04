import { appendTrailingSlash } from '../util/append-trailing-slash';
import path from 'path';
import { GatsbyNode } from 'gatsby';

const BLOG_POST_TEMPLATE_PATH = path.resolve('src/templates/blog-post.tsx');

export const createBlogPosts: GatsbyNode['createPages'] = async ({
  actions,
  reporter,
  graphql,
}) => {
  const { createPage } = actions;

  const markdownBlogPages = await graphql<{
    allMarkdownRemark: {
      nodes: {
        frontmatter: {
          path: string;
          date: string;
        };
      }[];
    };
  }>(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
      ) {
        nodes {
          frontmatter {
            path
            date
          }
        }
      }
    }
  `);

  if (markdownBlogPages.errors || !markdownBlogPages.data) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog pages.`);
    return;
  }

  // create a page for each markdown file
  markdownBlogPages.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: appendTrailingSlash(node.frontmatter.path),
      component: BLOG_POST_TEMPLATE_PATH,
      context: {
        // used for the sitemap
        publicationDate: node.frontmatter.date,
      },
    });
  });
};
