// should be used also in blog.tsx
const LOCALE = 'de-DE';
const DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formattedDate = (date: string): string => {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString(LOCALE, DATE_OPTIONS);
};
