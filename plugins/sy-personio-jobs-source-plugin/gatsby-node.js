const { fetch } = require('./personio-jobs-api');
const JOB_TYPE = 'SyPersonioJob';

exports.onPreInit = () => console.log('Loaded sy-personio-jobs-source-plugin');

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  { slugPrefix = '' },
) => {
  const { createNode } = actions;

  const positionsDE = await fetch('de');
  const positionsEN = await fetch('en');

  const positions = positionsDE.concat(positionsEN);
  const createSlug = (position) =>
    `/` + [slugPrefix, position.slug].join('/') + `/`;

  positions.forEach((position) => {
    const slug = createSlug(position);

    createNode({
      ...position,
      jobId: position.id,
      slug: slug,
      id: createNodeId(`${JOB_TYPE}-${position.lang}-${position.id}`),
      parent: null,
      children: [],
      internal: {
        type: JOB_TYPE,
        content: JSON.stringify(position),
        contentDigest: createContentDigest(position),
      },
    });
  });
};
