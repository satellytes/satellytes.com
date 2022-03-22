import { CreatePagesArgs } from 'gatsby';
import path from 'path';

const BLOG_POST_TEMPLATE_PATH = path.resolve(
  `${process.cwd()}/src/templates/blog-post.tsx`,
);

export const createBlogPosts = async ({
  actions,
  reporter,
  graphql,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  const contentfulBlogPages = await graphql<{
    allContentfulBlogPost: {
      nodes: {
        id: string;
        publicationDate: string;
        slug: string;
      }[];
    };
  }>(`
    {
      allContentfulBlogPost(sort: { fields: publicationDate, order: DESC }) {
        nodes {
          id
          publicationDate
          slug
        }
      }
    }
  `);

  if (contentfulBlogPages.errors || !contentfulBlogPages.data) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog pages.`);
    return;
  }

  // create a page for each markdown file
  contentfulBlogPages.data.allContentfulBlogPost.nodes.forEach((node) => {
    createPage({
      path: `/blog/${node.slug}/`,
      component: BLOG_POST_TEMPLATE_PATH,
      context: {
        // used for the sitemap
        publicationDate: node.publicationDate,
        // used for graphql query in template
        id: node.id,
      },
    });
  });
};
