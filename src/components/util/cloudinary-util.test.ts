import { assertCloudinaryUrl, transformCloudinaryUrl } from './cloudinary-util';

describe('cloudinary-util', () => {
  it('should detect a correct url', () => {
    expect(() =>
      assertCloudinaryUrl('http://cloudinary.com/satellytes'),
    ).not.toThrow();
    expect(() =>
      assertCloudinaryUrl('https://cloudinary.com/satellytes'),
    ).not.toThrow();
    expect(() =>
      assertCloudinaryUrl('https://cloudinary.com/satellytes/awdoiwadwao'),
    ).not.toThrow();
  });

  it('should detect an incorrect url', () => {
    expect(() => assertCloudinaryUrl(undefined as any)).toThrow();
    expect(() => assertCloudinaryUrl(null as any)).toThrow();
    expect(() => assertCloudinaryUrl('')).toThrow();
    expect(() => assertCloudinaryUrl('cloudinary.com/satellytes')).toThrow();
    expect(() => assertCloudinaryUrl('test.com')).toThrow();
  });

  it('should tranform a url', () => {
    const url =
      'https://res.cloudinary.com/satellytes/image/upload/v1592570224/satellytes-website/example-picture_crftva.png';
    const width = 100;
    const transformedUrl = transformCloudinaryUrl(url, width);
    expect(transformedUrl).toEqual(
      `https://res.cloudinary.com/satellytes/image/upload/w_${width}/satellytes-website/example-picture_crftva.png`,
    );
  });
});
