import path from 'path';
import { CreatePagesArgs } from 'gatsby';

const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  `${process.cwd()}/src/templates/career-details.tsx`,
);

/**
 * Get the full path including the language
 */
const getFullPath = (slug, lang) => {
  if (lang !== 'en') {
    return `/${lang}${slug}`;
  }

  return `${slug}`;
};

const getTranslationLocale = (locale) => (locale === 'en' ? 'de' : 'en');

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

  positions.forEach((position) => {
    const path = getFullPath(position.slug, position.node_locale);
    const translationPath = getFullPath(
      position.slug,
      getTranslationLocale(position.node_locale),
    );

    createPage({
      path: path,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        id: position.id, // internal object id which is unique across all jobs
        translation: translationPath,
        language: position.node_locale,
      },
    });
  });
};
