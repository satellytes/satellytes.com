const path = require('path');

const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  'src/templates/career-details.tsx',
);

/**
 * There can be multiple positions with the same jobId but a different language.
 * This methods helps to find the (first) position with the same jobId as the given jobId.
 */
const createComplementFinder = (positions) => {
  const groupedPositions = positions.reduce((memo, job) => {
    memo[job.jobId] = memo[job.jobId] ?? [];
    memo[job.jobId].push(job);
    return memo;
  }, {});

  return {
    get: (position) =>
      groupedPositions[position.jobId].find((job) => job.id !== position.id) ??
      null,
  };
};

const createCareerPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const {
    data: { allSyPersonioJob },
  } = await graphql(`
    {
      allSyPersonioJob {
        nodes {
          id
          lang
          jobId
          name
          slug
          path
        }
      }
    }
  `);

  const positions = allSyPersonioJob.nodes;
  const complementFinder = createComplementFinder(positions);

  positions.forEach((position) => {
    const complementPosition = complementFinder.get(position);

    createPage({
      path: position.path,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        id: position.id, // internal object id which is unique across all jobs
        language: position.lang,
        translation: complementPosition?.path ?? null,
      },
    });
  });
};

module.exports = {
  createCareerPages,
};
