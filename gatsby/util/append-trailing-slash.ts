export const appendTrailingSlash = (path) => {
  return path.endsWith('/') ? path : `${path}/`;
};
