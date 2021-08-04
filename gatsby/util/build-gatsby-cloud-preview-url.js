const PRODUCTION_BRANCH_NAME = 'main';
const DOMAIN_NAME = 'satellytescommain';

/**
 * Get the Gatsby Cloud Preview URL by branchName. If no branchName is given the
 * fallback URL gets return.
 *
 * On gatsby cloud the deployment urls follow a strict pattern:
 * - https://${DOMAIN_NAME}-${BRANCH_NAME}.gatsby.io
 *
 * Only lower case letters and numbers are used, everything else is filtered out.
 *
 */
const buildGatsbyCloudPreviewUrl = ({ branchName, fallbackUrl }) => {
  if (!branchName || branchName === PRODUCTION_BRANCH_NAME) {
    return fallbackUrl || '';
  }

  const formattedBranchName = branchName
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/gi, '');

  return `https://${DOMAIN_NAME}-${formattedBranchName}.gtsb.io`;
};

module.exports = {
  buildGatsbyCloudPreviewUrl: buildGatsbyCloudPreviewUrl,
};
