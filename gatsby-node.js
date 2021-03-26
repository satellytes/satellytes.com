const path = require(`path`);
const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');

const BLOG_POST_TEMPLATE_PATH = path.resolve('src/templates/blog-post.tsx');
const CLIENT_TEMPLATE_PATH = path.resolve('src/templates/client-details.tsx');
const CAREER_TEMPLATE_PATH = path.resolve('src/templates/career.tsx');
const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  'src/templates/career-details.tsx',
);

const PERSONIO_JOBS_URL = 'https://satellytes.jobs.personio.de/xml';
const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';

exports.createPages = async (createPagesArgs) => {
  await createCareerPages(createPagesArgs);
  await createBlogPages(createPagesArgs);
  // await createClientPages(createPagesArgs);
};

const createCareerPages = async ({ actions }) => {
  const { createPage } = actions;

  const jobsXmlResponse = await fetch(PERSONIO_JOBS_URL);
  const jobsXml = await jobsXmlResponse.text();
  const jobsParse = xmlParser.parse(jobsXml);
  const positions = jobsParse['workzag-jobs'].position;

  const slugifyPositionName = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/-/g, '-')
      .replace(/\//g, '-')
      .replace(/\(/g, '')
      .replace(/\)/g, '');
  };

  positions.forEach((position) => {
    position.satellytesPath = `/career/${position.id}-${slugifyPositionName(
      position.name,
    )}`;

    // we need to normalize the jobDescription to an array, otherwise gatsby
    // complains about different types for the same variable
    position.jobDescriptions.jobDescription = Array.isArray(
      position.jobDescriptions.jobDescription,
    )
      ? position.jobDescriptions.jobDescription
      : [position.jobDescriptions.jobDescription];

    position.jobDescriptions.jobDescription = position.jobDescriptions.jobDescription.map(
      (description) => {
        return {
          name: description.name.trim(),
          value: description.value.trim(),
        };
      },
    );

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

    createPage({
      path: position.satellytesPath,
      component: CAREER_DETAILS_TEMPLATE_PATH,
      context: {
        position,
      },
    });
  });

  createPage({
    path: '/career',
    component: CAREER_TEMPLATE_PATH,
    context: {
      positions: positions,
    },
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
      path: node.frontmatter.path,
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
      path: node.path,
      component: CLIENT_TEMPLATE_PATH,
      context: { linkToThePage: node.path },
    });
  });
};
