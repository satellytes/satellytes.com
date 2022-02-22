import { createRedirects } from './gatsby/create-pages/create-redirects';
import { createPreviewCards } from './gatsby/create-node/create-preview-cards';
import { createBlogPosts } from './gatsby/create-pages/create-blog-posts';
import { createCareerPages } from './gatsby/create-pages/create-career-pages';
import { createFilePath } from 'gatsby-source-filesystem';

exports.onCreateNode = async (gatsbyCreateNodeArgs) => {
  await createPreviewCards(gatsbyCreateNodeArgs);

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
 * We should use `@link` and link the given foreign key field to the actual node.
 * The before known foreign Key `___NODE` notation is deprecated, that's why we need the custom and explicit schema.
 *
 * You can't replace fields.socialCard hence the creation of the node in the parent.
 * This is syntactic sugar and as as an alternative can use
 * `schema.buildObjectType` and then resolve the reference manually through `context.nodeModel.getNodeById`
 *
 * Deprecation Note:
 * https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#___node-convention-is-deprecated
 *
 * How to "schema additions"
 * https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/#create-foreign-key-relationships-between-data
 */

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `type MarkdownRemark implements Node { 
      socialCardFile: File @link(from: "fields.socialCardFileId")
    }`,
    `type SyPersonioJob implements Node { 
      socialCardFile: File @link(from: "fields.socialCardFileId")
    }`,
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