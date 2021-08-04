/**
 * On gatsby cloud the deployment urls follow a strict pattern:
 * - https:// DOMAIN_NAME - BRANCH_NAME .gatsby.io
 *
 * Only lower case letters and numbers are used, everything else is filtered out.
 *
 */
const detectGatsbyCloudPreviewUrl = () => {
  const PRODUCTION_BRANCH_NAME = 'main';
  const DOMAIN_NAME = 'satellytescommain';

  // the branch name is set via an env variable on gatsby cloud
  // -> https://support.gatsbyjs.com/hc/en-us/articles/360052322954-Environment-Variables-Specific-to-Gatsby-Cloud
  const BRANCH_NAME = process.env.BRANCH;
  if (!BRANCH_NAME || BRANCH_NAME === PRODUCTION_BRANCH_NAME) {
    return process.env.GATBSY_BASE_URL || '';
  }

  const formattedBranchName = BRANCH_NAME.toLowerCase().replace(
    /[^a-zA-Z0-9]/gi,
    '',
  );

  return `https://${DOMAIN_NAME}-${formattedBranchName}.gtsb.io`;
};

module.exports = {
  detectGatsbyCloudPreviewUrl,
};
