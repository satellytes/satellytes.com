const {
  buildGatsbyCloudPreviewUrl,
} = require('./build-gatsby-cloud-preview-url');

describe('build-gatsby-cloud-preview-url', () => {
  test('should return a valid url', () => {
    const url = buildGatsbyCloudPreviewUrl({
      branchName: 'feature-branch-1',
    });
    expect(url).toBe('https://satellytescommain-featurebranch1.gtsb.io');
  });

  test('should return the fallback url for the production branch', () => {
    const url = buildGatsbyCloudPreviewUrl({
      branchName: 'main',
      fallbackUrl: 'fallback-url',
    });
    expect(url).toBe('fallback-url');
  });

  test('should return the fallback url if no branch is given', () => {
    const url = buildGatsbyCloudPreviewUrl({
      fallbackUrl: 'fallback-url',
    });
    expect(url).toBe('fallback-url');
  });
});
