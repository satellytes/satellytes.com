const PERSONIO_SLUG_FIELD_NAME = 'Slug';
/**
 * Extract the slug from a custom field we assigned to a Personio Job Description.
 * We hijack a rich text field for this operation, that's why we have to clean the result
 * from any html.
 *
 * The function returns null if there is no slug available
 */
const extractPersonioSlug = (jobDescription) => {
  const slugRaw = jobDescription.find(
    (description) => description.name.trim() === PERSONIO_SLUG_FIELD_NAME,
  );
  const slug = slugRaw?.value.replace(/<[^>]*>?/gm, '').trim() ?? null;

  if (slug?.length === 0) {
    return null;
  }

  return slug;
};

module.exports = {
  extractPersonioSlug,
  PERSONIO_SLUG_FIELD_NAME,
};
