// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`);
  const clientTemplate = path.resolve(`src/templates/client-details.tsx`);

  // get all clients from json file
  const resultClient = await graphql(`
    {
      allClientsJson {
        edges {
          node {
            link
          }
        }
      }
    }
  `);

  // get all markdown files
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors || resultClient.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // create a page for each markdown file
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {},
    });
  });

  // create a page for each client from json
  resultClient.data.allClientsJson.edges.forEach(({ node }) => {
    createPage({
      path: 'clients/' + node.link,
      component: clientTemplate,
      context: {},
    });
  });
};
