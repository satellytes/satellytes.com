import path from 'path';
import { CreatePagesArgs } from 'gatsby';

const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  `${process.cwd()}/src/templates/career-details.tsx`,
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

export const createCareerPages = async ({
  actions,
  graphql,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;

  const contentfulJobsResponse = await graphql<{
    allContentfulVacancy: {
      nodes: {
        id: string;
        name: string;
        slug: string;
        node_locale: string;
      }[];
    };
  }>(`
    {
      allContentfulVacancy {
        nodes {
          id
          name
          slug
          node_locale
        }
      }
    }
  `);

  if (contentfulJobsResponse.errors || !contentfulJobsResponse.data) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for career pages.`,
    );
    return;
  }

  const positions = contentfulJobsResponse.data.allContentfulVacancy.nodes;
  const complementFinder = createComplementFinder(positions);

  positions.forEach((position) => {
    const complementPosition = complementFinder.get(position);
    const path = getTranslationPath(position.slug, position.node_locale);
    // create an array of available languages, otherwise empty
    const overrideLanguages = [complementPosition?.lang ?? null].filter(
      (language) => language !== null,
    );

    createPage({
      path: path,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        id: position.id, // internal object id which is unique across all jobs
        translation: complementPosition?.slug ?? null,
        language: position.node_locale,
      },
    });
  });
};
