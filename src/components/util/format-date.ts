import { format, parseISO } from 'date-fns';

// input date format "yyyy-mm-dd" from markdown frontmatter
export const formattedDate = (date: string): string => {
  const parsedDate = parseISO(date);

  // output date format specified in LOCALE & DATE_OPTIONS
  return format(parsedDate, 'do MMMM y');
};
