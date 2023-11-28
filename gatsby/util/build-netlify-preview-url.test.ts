import { buildNetlifyPreviewUrl } from './build-netlify-preview-url';

describe('build-netlify-preview-url', () => {
  test('should return a valid url', () => {
    const url = buildNetlifyPreviewUrl({
      domainName: 'satellytes',
      branch: 'feature-branch-1',
      previewId: '123',
    });
    expect(url).toBe('https://deploy-preview-123--satellytes.netlify.app/');
  });

  test('should return null for the production branch', () => {
    const url = buildNetlifyPreviewUrl({
      domainName: 'satellytescommain',
      branch: 'main',
      previewId: '123',
    });
    expect(url).toBe(null);
  });

  test('should return  null if no domainName is given', () => {
    const url = buildNetlifyPreviewUrl({
      domainName: null,
      branch: 'something',
      previewId: '123',
    });
    expect(url).toBe(null);
  });
});
