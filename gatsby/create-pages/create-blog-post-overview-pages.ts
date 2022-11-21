import { CreatePagesArgs, PageProps } from 'gatsby';
import path from 'path';

const BLOG_OVERVIEW_TEMPLATE_PATH = path.resolve(
  `${process.cwd()}/src/templates/blog-post-overview.tsx`,
);

export interface BlogOverviewPageContext {
  limit: number;
  skip: number;
  numberOfPages: number;
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
      allContentfulBlogPost(
        filter: { node_locale: { eq: "en" } }
        sort: { publicationDate: DESC }
      ) {
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
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage<BlogOverviewPageContext>({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: BLOG_OVERVIEW_TEMPLATE_PATH,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numberOfPages: numberOfPages,
        currentPage: i + 1,
      },
    });
  });
};
