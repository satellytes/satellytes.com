const { createRedirects } = require('./gatsby/create-pages/create-redirects');
const {
  createPreviewCards,
} = require('./gatsby/create-node/create-preview-cards');
const { createBlogPosts } = require('./gatsby/create-pages/create-blog-posts');
const {
  createCareerPages,
} = require('./gatsby/create-pages/create-career-pages');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = (gatsbyCreateNodeArgs) => {
  createPreviewCards(gatsbyCreateNodeArgs);

  const { node, actions, getNode } = gatsbyCreateNodeArgs;
  const { createNodeField } = actions;
  /**
   * Provide a slug for any markdown page (which is not given by default)
   * to build our pages based on this markdown file.
   */
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

/**
 * We create the preview cards within `onCreateNode`
 * but we have to tell gatsby about the foreign key relationship
 * of the linked File.
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    /**
     * Variant 1: use `@link` and link the given field
     * You can't replace fields.socialCard hence the creation of the node in the parent
     */
    `type MarkdownRemark implements Node { 
      socialCard: File @link(from: "fields.socialCard")
    }`,
    /**
     * Variant 2: use `buildObjectType` and resolve the
     * foreign key relation through a resolver. The `@link` above
     * is basically syntactic sugar for this. I want to show both variants
     * here for education purposes as it was a long bumpy road.
     *
     * Before ew used the deprecated fielname___NODE way of adding
     * the FK relationship which fails for incremental builds in gatsby 4
     *
     *
     * Deprecated Note:
     * https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#___node-convention-is-deprecated
     *
     * How to "schema additions"
     * https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/#create-foreign-key-relationships-between-data
     */
    schema.buildObjectType({
      name: 'SyPersonioJob',
      fields: {
        socialCard: {
          type: 'File',
          resolve: (source, args, context, info) => {
            return context.nodeModel.getNodeById({
              id: source.fields.socialCard,
              type: 'File',
            });
          },
        },
      },
      interfaces: ['Node'],
    }),
  ];

  createTypes(typeDefs);
};

exports.createPages = async (createPagesArgs) => {
  await createCareerPages(createPagesArgs);
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
