const {
  extractPersonioSlug,
  PERSONIO_SLUG_FIELD_NAME,
} = require('./gatsby/util/extract-personio-slug');
const {
  generateCard,
} = require('./gatsby/util/preview-card-generator/generate-card');
const slugify = require('slugify');
const path = require('path');
const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');
const { decode } = require('html-entities');
const { siteMetadata } = require('./gatsby-config');
const { createRedirects } = require('./gatsby/create-pages/create-redirects');
const {
  createPreviewCard,
} = require('./gatsby/create-node/create-preview-card');

const BLOG_POST_TEMPLATE_PATH = path.resolve('src/templates/blog-post.tsx');
const CLIENT_TEMPLATE_PATH = path.resolve('src/templates/client-details.tsx');
const CAREER_TEMPLATE_PATH = path.resolve('src/templates/career.tsx');
const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  'src/templates/career-details.tsx',
);

const PERSONIO_JOBS_URL = 'https://satellytes.jobs.personio.de/xml';
const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';
const LANGUAGES = ['en', 'de'];

exports.onCreateNode = (gatsbyCreateNodeArgs) => {
  createPreviewCard(gatsbyCreateNodeArgs);
};

exports.createPages = async (createPagesArgs) => {
  await createCareerPages(createPagesArgs);
  await createBlogPages(createPagesArgs);
  // await createClientPages(createPagesArgs);

  createRedirects(createPagesArgs);
};

/**
 * Generate all career pages by querying the personio API.
 * Currently this extracts a single (default) language even though we can
 * author multiple languages.
 *
 * The query will also create a matching social card in `public/`
 * and pass it to the context of the created page.
 */
const createCareerPages = async ({ actions }) => {
  const { createPage } = actions;

  const fetchPositionsByLanguage = LANGUAGES.map(async (languageKey) => {
    const PERSONIO_JOBS_URL_LANG = PERSONIO_JOBS_URL.concat(
      `?language=${languageKey}`,
    );
    const jobsXmlResponse = await fetch(PERSONIO_JOBS_URL_LANG);
    const jobsXml = await jobsXmlResponse.text();
    const options = {
      tagValueProcessor: (a) => decode(a), // &#039; -> '
    };
    const jobsParse = xmlParser.parse(jobsXml, options);
    const positions = jobsParse['workzag-jobs'].position;
    return { positions, languageKey };
  });

  await Promise.all(fetchPositionsByLanguage).then(
    async (positionsByLanguage) => {
      for (let index = 0; index < positionsByLanguage.length; index++) {
        const positions = positionsByLanguage[index].positions;
        const languageKey = positionsByLanguage[index].languageKey;

        // position is valid if it has a job description and slug
        const isValidPosition = (position) => {
          const { jobDescription } = position.jobDescriptions;
          const isArray = Array.isArray(jobDescription);
          if (isArray) {
            const slug = jobDescription.find(
              (description) =>
                description.name.trim() === PERSONIO_SLUG_FIELD_NAME &&
                description.value.trim(),
            );
            if (slug || position.satellytesPath) {
              return true;
            } else {
              console.warn(
                `No slug for job "${position.name}" (${position.id}) found!`,
              );
            }
          }
          return false;
        };

        const getSlug = (position) => {
          if (position.satellytesPath) {
            return position.satellytesPath;
          }

          const slug = extractPersonioSlug(
            position.jobDescriptions.jobDescription,
          );
          return `/career/${slug}/`;
        };

        positions.forEach((position) => {
          if (!isValidPosition(position)) {
            return null;
          }

          // we need to normalize the jobDescription to an array, otherwise gatsby
          // complains about different types for the same variable
          position.jobDescriptions.jobDescription = Array.isArray(
            position.jobDescriptions.jobDescription,
          )
            ? position.jobDescriptions.jobDescription
            : [position.jobDescriptions.jobDescription];

          position.jobDescriptions.jobDescription =
            position.jobDescriptions.jobDescription
              .map((description) => {
                if (description.name.trim() === PERSONIO_SLUG_FIELD_NAME) {
                  position.satellytesPath = getSlug(position);
                  return undefined;
                } else {
                  return {
                    name: description.name.trim(),
                    value: description.value.trim(),
                  };
                }
              })
              .filter((position) => position);

          const description = position.jobDescriptions.jobDescription.find(
            (description) =>
              description.name === PERSONIO_SHORT_DESCRIPTION_NAME,
          );
          if (!description || !description.value) {
            console.warn(
              `No description for job "${position.name}" (${position.id}) found!`,
            );
          }

          position.satellytesShortDescription = description
            ? description.value || ''
            : '';

          /**
           * Ideally we create first the nodes from the API and then create the pages
           * That way we could incorporate the onCreateNode method to generate the image
           * for career positions too. Until then we run it manually here and pass in the
           * path to the image through the context
           */
          const fileName = `social-card---career-${slugify(position.name, {
            lower: true,
          })}.jpg`;
          const outputFile = path.join('public', fileName);
          const publicUrl = `${siteMetadata.siteUrl}/${fileName}`;

          generateCard({ title: position.name }, outputFile);

          const getTranslation = (id) => {
            return positionsByLanguage
              .map(({ positions, languageKey: key }) => {
                if (key !== languageKey) {
                  // check if there is an open position in a different language with the same id
                  const translatedPosition = positions.find(
                    (position) =>
                      isValidPosition(position) && position.id === id,
                  );
                  return translatedPosition && getSlug(translatedPosition);
                }
                return null;
              })
              .filter((link) => link)[0];
          };

          if (!position.satellytesPath) return null;

          createPage({
            path: appendTrailingSlash(
              `${languageKey === 'en' ? '' : `/${languageKey}`}${
                position.satellytesPath
              }`,
            ),
            component: CAREER_DETAILS_TEMPLATE_PATH,
            context: {
              position,
              socialCardImage: publicUrl,
              language: languageKey,
              translation: getTranslation(position.id),
            },
          });
        });

        const jobPositions = positions.filter(
          (position) => position.satellytesPath,
        );

        createPage({
          path: `/${
            languageKey === 'en' ? '' : languageKey.concat('/')
          }career/`,
          component: CAREER_TEMPLATE_PATH,
          context: {
            positions: jobPositions,
            language: languageKey,
          },
        });
      }
    },
  );
};

const createBlogPages = async ({ actions, reporter, graphql }) => {
  const { createPage } = actions;

  const markdownBlogPages = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(blog-posts)/" } }
      ) {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `);

  if (markdownBlogPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog pages.`);
    return;
  }

  // create a page for each markdown file
  markdownBlogPages.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: appendTrailingSlash(node.frontmatter.path),
      component: BLOG_POST_TEMPLATE_PATH,
      context: {},
    });
  });
};

const createClientPages = async ({ actions, reporter, graphql }) => {
  const { createPage } = actions;

  const clientPages = await graphql(`
    {
      allClientsJson {
        nodes {
          path
        }
      }
    }
  `);

  if (clientPages.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for client pages.`,
    );
    return;
  }

  clientPages.data.allClientsJson.nodes.forEach((node) => {
    createPage({
      path: appendTrailingSlash(node.path),
      component: CLIENT_TEMPLATE_PATH,
      context: { linkToThePage: node.path },
    });
  });
};

// for leaflet to prevent window errors
// cherry picked from https://github.com/dweirich/gatsby-plugin-react-leaflet/blob/a2bb72eab0d26b22ae0ee2e04bfda0114a147132/gatsby-node.js
exports.onCreateWebpackConfig = function (_ref) {
  const stage = _ref.stage;
  const actions = _ref.actions;
  const regex = [/node_modules\/leaflet/, /node_modules\\leaflet/];

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: regex,
            use: 'null-loader',
          },
        ],
      },
    });
  }
};

const appendTrailingSlash = (path) => {
  return path.endsWith('/') ? path : `${path}/`;
};
