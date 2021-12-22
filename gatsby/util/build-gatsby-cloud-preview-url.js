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

const PRODUCTION_BRANCH = 'main';
const buildGatsbyCloudPreviewUrl = ({ prefix, branch }) => {
  if (!prefix | !branch || branch === PRODUCTION_BRANCH) {
    return null;
  }

  const formattedBranchName = branch
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/gi, '');

  return `https://${prefix}-${formattedBranchName}.gtsb.io`;
};

module.exports = {
  buildGatsbyCloudPreviewUrl: buildGatsbyCloudPreviewUrl,
};
