const { createRedirects } = require('./gatsby/create-pages/create-redirects');
const {
  createPreviewCard,
} = require('./gatsby/create-node/create-preview-card');
const { createBlogPosts } = require('./gatsby/create-pages/create-blog-posts');
const {
  createCareerDetails,
} = require('./gatsby/create-pages/create-career-details');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = (gatsbyCreateNodeArgs) => {
  createPreviewCard(gatsbyCreateNodeArgs);
  const { node, actions, getNode } = gatsbyCreateNodeArgs;
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async (createPagesArgs) => {
  await createCareerDetails(createPagesArgs);
  await createBlogPosts(createPagesArgs);
  createRedirects(createPagesArgs);
};

// for leaflet to prevent window errors
// cherry picked from https://github.com/dweirich/gatsby-plugin-react-leaflet/blob/a2bb72eab0d26b22ae0ee2e04bfda0114a147132/gatsby-node.js
exports.onCreateWebpackConfig = function (_ref) {
  const stage = _ref.stage;
  const actions = _ref.actions;
  const regex = [/node_modules\/leaflet/, /node_modules\\leaflet/];

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: regex,
            use: 'null-loader',
          },
        ],
      },
    });
  }
};
