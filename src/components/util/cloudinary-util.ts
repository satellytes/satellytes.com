export const isCloudinaryUrl = (src: string): boolean => {
  try {
    const url = new URL(src);
    return (
      url.hostname.includes('cloudinary.com') &&
      url.pathname.startsWith('/satellytes')
    );
  } catch {
    return false;
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
