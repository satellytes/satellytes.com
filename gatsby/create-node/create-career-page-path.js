/**
 * Ensure to add a field `path` to every node `SyPersonioJob` that is created
 * so we have proper paths for our career detail pages that are derived from here.
 */
const createCareerPagePathField = ({ node, createNodeField }) => {
  const getPath = ({ slug, lang }) => {
    if (lang !== 'en') {
      return `/${lang}/career/${slug}/`;
    }

    return `/career/${slug}/`;
  };

  const value = getPath(node);

  createNodeField({
    name: `path`,
    node,
    value,
  });
};

module.exports = {
  createCareerPagePathField,
};
