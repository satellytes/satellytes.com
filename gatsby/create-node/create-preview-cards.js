const slugify = require('slugify');
const path = require('path');
const { siteMetadata } = require('../../gatsby-config');
const {
  generateCard,
} = require('../util/preview-card-generator/generate-card');

/**
 * Create a preview card file and put the url to the Gatsby store to be able
 * to link it in the page header.
 */
const createPreviewMarkdown = ({ node, _, actions }) => {
  const { createNodeField } = actions;
  const post = node.frontmatter;

  // we need the title in order to generate anything
  if (!post.title) {
    return;
  }

  // we create a file name from the path (which is the page slug and more unique) but if none is available take the title
  const fileName = `social-card---${slugify(post.path || post.title, {
    lower: true,
  })}.jpg`;
  const outputFile = path.join('public', fileName);
  const imagePath = `/${fileName}`;

  generateCard({ title: post.title }, outputFile).then(() => {
    createNodeField({
      node,
      name: `socialCard`,
      value: imagePath,
    });
  });
};

const createPreviewJob = ({ node, _, actions }) => {
  const { createNodeField } = actions;

  const fileName = `social-card---career-${slugify(node.name, {
    lower: true,
  })}.jpg`;

  const outputFile = path.join('public', fileName);
  const imagePath = `/${fileName}`;

  generateCard({ title: node.name }, outputFile).then(() => {
    createNodeField({
      node,
      name: 'socialCard',
      value: imagePath,
    });
  });
};

const createPreviewCards = ({ node, _, actions }) => {
  if (node.internal.type === 'SyPersonioJob') {
    createPreviewJob({ node, _, actions });
  }

  if (node.internal.type === 'MarkdownRemark') {
    createPreviewMarkdown({ node, _, actions });
  }
};

module.exports = {
  createPreviewCards,
};
