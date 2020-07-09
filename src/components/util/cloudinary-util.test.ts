import { isCloudinaryUrl, transformCloudinaryUrl } from './cloudinary-util';

describe('cloudinary-util', () => {
  it('should detect a correct url', () => {
    expect(isCloudinaryUrl('http://cloudinary.com/satellytes')).toBeTruthy();
    expect(isCloudinaryUrl('https://cloudinary.com/satellytes')).toBeTruthy();
    expect(
      isCloudinaryUrl('https://cloudinary.com/satellytes/awdoiwadwao'),
    ).toBeTruthy();
  });

  it('should detect an incorrect url', () => {
    expect(isCloudinaryUrl(undefined as any)).toBeFalsy();
    expect(isCloudinaryUrl(null as any)).toBeFalsy();
    expect(isCloudinaryUrl('')).toBeFalsy();
    expect(isCloudinaryUrl('cloudinary.com/satellytes')).toBeFalsy();
    expect(isCloudinaryUrl('test.com')).toBeFalsy();
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
