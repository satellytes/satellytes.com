const {
  generateCardToBuffer,
} = require('../util/preview-card-generator/generate-card');

const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

/**
 * Create a preview card file and put the url to the Gatsby store to be able
 * to link it in the page header.
 */
const createPreviewCard = async (
  title,
  { node, _, actions, getCache, createNodeId },
) => {
  const { createNode, createNodeField } = actions;

  // we need the title in order to generate anything
  if (!title) {
    return;
  }

  const buffer = await generateCardToBuffer({ title });
  /**
   * The util function `createFileNodeFromBuffer` from the official gatsby source plugin `gatsby-source-filesystem`
   * creates a file node from a given file buffer. The value of `parentNodeId` creates the necessary relationship
   * between the original node and the actual file node so it's not garbage collected.
   *
   * The actual foreign key relationship is resolved through `createSchemaCustomization`
   * in gatsby-node.js for all node types the `createPreviewCard` is invoked for.
   */
  const fileNode = await createFileNodeFromBuffer({
    name: 'social-card',
    buffer,
    getCache,
    createNode,
    createNodeId,
    parentNodeId: node.id,
  });

  if (fileNode) {
    createNodeField({
      node,
      name: `socialCardFileId`,
      value: fileNode.id,
    });
  }
};

const createPreviewCards = async ({ node, ...rest }) => {
  if (node.internal.type === 'SyPersonioJob') {
    await createPreviewCard(node.name, { node, ...rest });
  }

  if (node.internal.type === 'MarkdownRemark') {
    await createPreviewCard(node.frontmatter.title, { node, ...rest });
  }
};

module.exports = {
  createPreviewCards,
};
