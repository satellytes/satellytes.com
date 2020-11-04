// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require(`path`);

const BLOG_POST_TEMPLATE_PATH = path.resolve(`src/templates/blog-post.tsx`);
const CLIENT_TEMPLATE_PATH = path.resolve(`src/templates/client-details.tsx`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const clientPages = await graphql(`
    {
      allClientsJson {
        nodes {
          path
        }
      }
    }
  `);

  const markdownPages = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
      ) {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `);

  if (markdownPages.errors || clientPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // create a page for each markdown file
  markdownPages.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.frontmatter.path,
      component: BLOG_POST_TEMPLATE_PATH,
      context: {},
    });
  });

  // create a page for each client from json
  clientPages.data.allClientsJson.nodes.forEach((node) => {
    /**
     * commented out, as we currently only have a clients overview page
     */
    // createPage({
    //   path: node.path,
    //   component: CLIENT_TEMPLATE_PATH,
    //   context: { linkToThePage: node.path },
    // });
  });
};
