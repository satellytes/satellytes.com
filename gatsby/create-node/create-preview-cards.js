const {
  generateCardToBuffer,
} = require('../util/preview-card-generator/generate-card');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

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
  });

  if (fileNode) {
    createNodeField({
      node,
      name: `socialCard___NODE`,
      value: fileNode.id,
    });
  }
};

const createPreviewCards = ({ node, ...rest }) => {
  if (node.internal.type === 'SyPersonioJob') {
    return createPreviewCard(node.name, { node, ...rest });
  }

  if (node.internal.type === 'MarkdownRemark') {
    return createPreviewCard(node.frontmatter.title, { node, ...rest });
  }
};

module.exports = {
  createPreviewCards,
};
