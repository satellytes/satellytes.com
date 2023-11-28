/**
 * Get the Netlify Preview URL by previewId
 * (this equals the github entity id, e.g. PR id).
 * If no previewId is given the fallback URL gets return.
 *
 * On netlify the deployment urls follow a strict pattern:
 * - https://deploy-preview-${PREVIEW_ID}--${DOMAIN_NAME}.netlify.app/
 */

const PRODUCTION_BRANCH = 'main';
export const buildNetlifyPreviewUrl = ({ domainName, reviewId, branch }) => {
  if (!domainName || !reviewId || branch === PRODUCTION_BRANCH) {
    return null;
  }

  return `https://deploy-preview-${reviewId}--${domainName}.netlify.app/`;
};
