import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

export const formatDate = (date: string, dateFormat?: string): string => {
  const parsedDate = parseISO(date);

  return format(parsedDate, dateFormat || 'do MMMM y', { locale: de });
};
