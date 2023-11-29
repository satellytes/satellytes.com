export const textEllipsis = (text, maxLength) => {
  const truncatedText = text.substring(0, maxLength);
  if (truncatedText.length < text.length) {
    return truncatedText + '...';
  }

  return truncatedText;
};
