/**
 * Check if the given URL is a valid Satellytes Cloudinary URL. Throws an error
 * if not.
 *
 * @param src
 */
export const assertCloudinaryUrl = (src: string): void => {
  const url = new URL(src);
  if (
    !url.hostname.includes('cloudinary.com') ||
    !url.pathname.startsWith('/satellytes')
  ) {
    throw new Error(
      'Please provide a valid image URL in markdown file. The image needs to be hosted on Cloudinary. Your invalid URL: ' +
        src,
    );
  }
};

export const transformCloudinaryUrl = (src: string, width: number): string => {
  if (width <= 0) {
    return '';
  }

  const srcParts = src.split('/');
  const imageId = srcParts[srcParts.length - 1];
  const transformations = `w_${width}`;
  return `https://res.cloudinary.com/satellytes/image/upload/${transformations}/satellytes-website/${imageId}`;
};
