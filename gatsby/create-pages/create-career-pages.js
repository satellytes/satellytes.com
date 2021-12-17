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

/**
 * Get the full path including the language
 */
const getTranslationPath = (slug, lang) => {
  if (lang !== 'en') {
    return `/${lang}${slug}`;
  }

  return `${slug}`;
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
        }
      }
    }
  `);

  const positions = allSyPersonioJob.nodes;
  const complementFinder = createComplementFinder(positions);

  positions.forEach((position) => {
    const complementPosition = complementFinder.get(position);
    const path = getTranslationPath(position.slug, position.lang);

    createPage({
      path: path,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        id: position.id, // internal object id which is unique across all jobs
        language: position.lang,
        translation: complementPosition?.slug ?? null,
      },
    });
  });
};

module.exports = {
  createCareerPages,
};
