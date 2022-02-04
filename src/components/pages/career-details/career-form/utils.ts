const getFilenameWithoutFiletype = (filename) => {
  // usually we get 2 entries, but the filename could also contain dots
  const nameWithFileType = filename.split('.');

  // for filenames that don't have a filetype
  if (nameWithFileType.length === 1) {
    return nameWithFileType[0];
  }

  // we remove the last element, which is the filetype
  nameWithFileType.pop();

  return nameWithFileType.join('.');
};

export const createFileId = (filename) => {
  const base = getFilenameWithoutFiletype(filename);
  return base.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};
