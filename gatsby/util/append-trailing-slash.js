const appendTrailingSlash = (path) => {
  return path.endsWith('/') ? path : `${path}/`;
};

module.exports = {
  appendTrailingSlash,
};
