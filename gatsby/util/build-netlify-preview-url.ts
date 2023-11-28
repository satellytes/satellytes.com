const PRODUCTION_BRANCH = 'main';
export const buildNetlifyPreviewUrl = ({ domainName, reviewId, branch }) => {
  if (!domainName || !reviewId || branch === PRODUCTION_BRANCH) {
    return null;
  }

  return `https://deploy-preview-${reviewId}--${domainName}.netlify.app/`;
};
