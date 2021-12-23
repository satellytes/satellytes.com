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
      name: `socialCard`,
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
