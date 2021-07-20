const { generateCard } = require('./tooling/generate-card/generate-card');
const slugify = require('slugify');
const path = require('path');
const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');
const { decode } = require('html-entities');

const BLOG_POST_TEMPLATE_PATH = path.resolve('src/templates/blog-post.tsx');
const CLIENT_TEMPLATE_PATH = path.resolve('src/templates/client-details.tsx');
const CAREER_TEMPLATE_PATH = path.resolve('src/templates/career.tsx');
const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  'src/templates/career-details.tsx',
);

const { siteMetadata } = require('./gatsby-config');
const PERSONIO_JOBS_URL = 'https://satellytes.jobs.personio.de/xml';
const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';
const LANGUAGES = ['en', 'de'];

exports.onCreateNode = ({ node, getNode, actions, graphql }, options) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
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
    const publicUrl = `${siteMetadata.siteUrl}/${fileName}`;

    generateCard({ title: post.title }, outputFile).then((filename) => {
      createNodeField({
        node,
        name: `socialCard`,
        value: publicUrl,
      });
    });
  }
};

exports.createPages = async (createPagesArgs) => {
  await createCareerPages(createPagesArgs);
  await createBlogPages(createPagesArgs);
  // await createClientPages(createPagesArgs);
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

  const positionsGroupedByLanguage = LANGUAGES.map(async (langKey) => {
    const PERSONIO_JOBS_URL_LANG = PERSONIO_JOBS_URL.concat(
      `?language=${langKey}`,
    );
    const jobsXmlResponse = await fetch(PERSONIO_JOBS_URL_LANG);
    const jobsXml = await jobsXmlResponse.text();
    const options = {
      tagValueProcessor: (a) => decode(a), // &#039; -> '
    };
    const jobsParse = xmlParser.parse(jobsXml, options);
    const positions = jobsParse['workzag-jobs'].position;
    return { positions, langKey };
  });

  await Promise.all(positionsGroupedByLanguage).then(async (values) => {
    for (let i = 0; i < values.length; i++) {
      const positions = values[i].positions;
      const langKey = values[i].langKey;

      // position is valid if it has a job description
      const isValidPosition = (position) => {
        return position.jobDescriptions.jobDescription;
      };

      positions.forEach((position) => {
        if (!isValidPosition(position)) {
          return null;
        }

        position.satellytesPath = `/${
          langKey === 'en' ? '' : langKey.concat('/')
        }career/${position.id}/`;

        // we need to normalize the jobDescription to an array, otherwise gatsby
        // complains about different types for the same variable
        position.jobDescriptions.jobDescription = Array.isArray(
          position.jobDescriptions.jobDescription,
        )
          ? position.jobDescriptions.jobDescription
          : [position.jobDescriptions.jobDescription];

        position.jobDescriptions.jobDescription =
          position.jobDescriptions.jobDescription.map((description) => {
            return {
              name: description.name.trim(),
              value: description.value.trim(),
            };
          });

        const description = position.jobDescriptions.jobDescription.find(
          (description) => description.name === PERSONIO_SHORT_DESCRIPTION_NAME,
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

        // translation is currently based on id
        // the urls are /:lang/career/:id
        // hasTranslation() return -1 when there is no translation available
        const hasTranslation = (id) => {
          return values
            .map(({ positions, langKey: key }) => {
              if (key === langKey) {
                return false;
              } else {
                return positions.find(
                  (position) => isValidPosition(position) && position.id === id,
                );
              }
            })
            .findIndex((translatable) => translatable);
        };

        createPage({
          path: appendTrailingSlash(position.satellytesPath),
          component: CAREER_DETAILS_TEMPLATE_PATH,
          context: {
            position,
            socialCardImage: publicUrl,
            language: langKey,
            hasTranslation: hasTranslation(position.id) >= 0,
          },
        });
      });

      const jobPositions = positions.filter(
        (position) => position.satellytesPath,
      );

      createPage({
        path: `/${langKey === 'en' ? '' : langKey.concat('/')}career/`,
        component: CAREER_TEMPLATE_PATH,
        context: {
          positions: jobPositions,
          language: langKey,
        },
      });
    }
  });
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
