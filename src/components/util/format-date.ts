import { format, parseISO } from 'date-fns';
import { de, enGB } from 'date-fns/locale';

export const formatDate = (
  date: string,
  dateFormat?: string,
  locale?: string,
): string => {
  const parsedDate = parseISO(date);
  const currentLocale = locale == 'de' ? de : enGB;

  return format(parsedDate, dateFormat || 'do MMMM y', {
    locale: currentLocale,
  });
};
