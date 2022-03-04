import path from 'path';
import { GatsbyNode } from 'gatsby';

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

export const createCareerPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const personioJobsResponse = await graphql<{
    allSyPersonioJob: {
      nodes: {
        id: string;
        lang: string;
        jobId: string;
        name: string;
        slug: string;
      }[];
    };
  }>(`
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

  if (personioJobsResponse.errors || !personioJobsResponse.data) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for career pages.`,
    );
    return;
  }

  const positions = personioJobsResponse.data.allSyPersonioJob.nodes;
  const complementFinder = createComplementFinder(positions);

  positions.forEach((position) => {
    const complementPosition = complementFinder.get(position);
    const path = getTranslationPath(position.slug, position.lang);
    // create an array of available languages, otherwise empty
    const overrideLanguages = [complementPosition?.lang ?? null].filter(
      (language) => language !== null,
    );

    createPage({
      path: path,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        id: position.id, // internal object id which is unique across all jobs
        language: position.lang,
        translation: complementPosition?.slug ?? null,
        overrideLanguages: overrideLanguages,
      },
    });
  });
};
