import { buildGatsbyCloudPreviewUrl } from './build-gatsby-cloud-preview-url';

describe('build-gatsby-cloud-preview-url', () => {
  test('should return a valid url', () => {
    const url = buildGatsbyCloudPreviewUrl({
      prefix: 'satellytescommain',
      branch: 'feature-branch-1',
    });
    expect(url).toBe('https://satellytescommain-featurebranch1.gtsb.io');
  });

  test('should return null for the production branch', () => {
    const url = buildGatsbyCloudPreviewUrl({
      prefix: 'satellytescommain',
      branch: 'main',
    });
    expect(url).toBe(null);
  });

  test('should return null without a branch given', () => {
    const url = buildGatsbyCloudPreviewUrl({
      prefix: 'satellytescommain',
      branch: null,
    });
    expect(url).toBe(null);
  });

  test('should return  null if no prefix is given', () => {
    const url = buildGatsbyCloudPreviewUrl({
      prefix: null,
      branch: 'something',
    });
    expect(url).toBe(null);
  });
});
