import { CreatePagesArgs, PageProps } from 'gatsby';
import path from 'path';

const BLOG_OVERVIEW_TEMPLATE_PATH = path.resolve(
  `${process.cwd()}/src/templates/blog-post-overview.tsx`,
);

export interface BlogOverviewPageContext {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
}

export const createBlogPostOverviewPages = async ({
  actions,
  reporter,
  graphql,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  const contentfulBlogPages = await graphql<{
    allContentfulBlogPost: {
      nodes: {
        fields: {
          path: string;
        };
      }[];
    };
  }>(`
    {
      allContentfulBlogPost(sort: { fields: publicationDate, order: DESC }) {
        nodes {
          fields {
            path
          }
        }
      }
    }
  `);

  if (contentfulBlogPages.errors || !contentfulBlogPages.data) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for blog pagination pages.`,
    );
    return;
  }

  const posts = contentfulBlogPages.data.allContentfulBlogPost.nodes;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage<BlogOverviewPageContext>({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: BLOG_OVERVIEW_TEMPLATE_PATH,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
