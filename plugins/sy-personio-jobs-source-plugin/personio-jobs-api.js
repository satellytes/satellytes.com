const { default: axios } = require('axios');
const { XMLParser } = require('fast-xml-parser');
const { decode } = require('html-entities');
const striptags = require('striptags');

const PERSONIO_JOBS_URL = 'https://satellytes.jobs.personio.de/xml';

const PERSONIO_SLUG_FIELD_NAME = 'Slug';
const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';

/**
 * Personio doesn't offer any meta fields
 * so we store data in custom fields that aere actually
 * meant as content.
 *
 * We find the matching descriptions for the keys
 * and return their values. The receiver can the easily destructure it:
 *
 * const [slug, short] = extractDescriptionValues(jobDescriptions, [slugKey, shortDescriptionKey])
 */
const extractDescriptionValues = (descriptions, keys) => {
  return keys.reduce((memo, key) => {
    const description = descriptions.find((item) => item.name.trim() === key);

    if (!description) {
      return memo;
    }

    const value = striptags(description.value).trim();
    memo.push(value);

    return memo;
  }, []);
};

/*
   Drop descriptions. We mainly use that
   to remove meta data descriptions that we 
   are going to extract in beforehand.
 */
function dropDescriptions(descriptions) {
  return descriptions.reduce((memo, item) => {
    if (
      [PERSONIO_SLUG_FIELD_NAME, PERSONIO_SHORT_DESCRIPTION_NAME].includes(
        item.name,
      )
    ) {
      return memo;
    }

    memo.push(item);
    return memo;
  }, []);
}

/**
 * Incoming an array of object with the format of:
 * {name, value} where name is the custom headline defined in Personio
 * and value is a rich text fields that includes html taga.
 *
 * This function makes sure that we strip and trim the content
 * which is given to us in a pretty raw form.
 *
 * In addition we rename the fields so we can forward them as is into
 * the Gatsby store.
 */
function parseDescriptions(jobDescriptions) {
  const [slug, short] = extractDescriptionValues(jobDescriptions, [
    PERSONIO_SLUG_FIELD_NAME,
    PERSONIO_SHORT_DESCRIPTION_NAME,
  ]);
  const remainingDescriptions = dropDescriptions(jobDescriptions, [
    PERSONIO_SLUG_FIELD_NAME,
    PERSONIO_SHORT_DESCRIPTION_NAME,
  ]);

  const sections = remainingDescriptions.map((item) => ({
    headline: item.name,
    descriptionHtml: item.value.trim(),
    description: striptags(item.value.trim()),
  }));

  return { sections, slug, short };
}

const getPath = ({ slug, lang }) => {
  if (lang !== 'en') {
    return `/${lang}/career/${slug}`;
  }

  return `/career/${slug}`;
};

/**
 * Given a set of positions from the XML API of Personio
 * we need to do some processing to have a proper dataset
 * we can feed into the Gatsby GraphQL backend.
 */
function normalize(positions, lang) {
  return positions.reduce((memo, position) => {
    const { jobDescription } = position.jobDescriptions;
    if (!jobDescription) {
      console.warn(
        `No description for job "${position.name}" (${position.id}) found! Job ignored.`,
      );
      return memo;
    }

    const { sections, slug, short } = parseDescriptions(jobDescription);
    const path = getPath({ slug, lang });
    delete position.jobDescriptions;

    memo.push({
      ...position,
      slug,
      short,
      sections,
      lang,
      path,
    });

    return memo;
  }, []);
}

/**
 * Fetch all available jobs for the given language
 * from our Personio API endpoint.
 */
async function fetch(language) {
  const url = `${PERSONIO_JOBS_URL}?language=${language}`;
  const jobsXmlResponse = await axios.get(url);
  const jobsXml = await jobsXmlResponse.data;
  const xmlParser = new XMLParser({
    tagValueProcessor: (_, value) => decode(value),
  });

  const jobsParse = xmlParser.parse(jobsXml);
  const positions = jobsParse['workzag-jobs'].position;

  return normalize(positions, language);
}

module.exports = {
  fetch,
};
