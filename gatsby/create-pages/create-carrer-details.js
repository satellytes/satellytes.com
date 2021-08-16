const fetch = require('node-fetch');
const { decode } = require('html-entities');
const xmlParser = require('fast-xml-parser');
const {
  PERSONIO_SLUG_FIELD_NAME,
  extractPersonioSlug,
} = require('../util/extract-personio-slug');
const slugify = require('slugify');
const path = require('path');
const { siteMetadata } = require('../../gatsby-config');
const {
  generateCard,
} = require('../util/preview-card-generator/generate-card');
const { appendTrailingSlash } = require('../util/append-trailing-slash');

const CAREER_TEMPLATE_PATH = path.resolve('src/templates/career.tsx');
const CAREER_DETAILS_TEMPLATE_PATH = path.resolve(
  'src/templates/career-details.tsx',
);

const PERSONIO_JOBS_URL = 'https://satellytes.jobs.personio.de/xml';
const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';
const PERSONIO_LANGUAGES = ['en', 'de'];

/**
 * Generate all career pages by querying the personio API.
 * Currently this extracts a single (default) language even though we can
 * author multiple languages.
 *
 * The query will also create a matching social card in `public/`
 * and pass it to the context of the created page.
 */
const createCareerDetails = async ({ actions }) => {
  const { createPage } = actions;

  const fetchPositionsByLanguage = PERSONIO_LANGUAGES.map(
    async (languageKey) => {
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
    },
  );

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

module.exports = {
  createCareerDetails,
};
