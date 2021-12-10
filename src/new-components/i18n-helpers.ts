import { useTranslation } from 'gatsby-plugin-react-i18next';
import { format, parseISO } from 'date-fns';
import { enGB, de } from 'date-fns/locale';
/**
 * A custom  hook to read the current language
 * and return a formatter (date-fns) with the correct locale set
 * with the default being `enGB` for any unknwon language.
 */
export const useLocalFormat = (dateFormat) => {
  const { i18n } = useTranslation();

  const getLocal = (language) => {
    if (language === 'de') {
      return de;
    }

    return enGB;
  };

  return (date) =>
    format(parseISO(date), dateFormat, {
      locale: getLocal(i18n.language),
    });
};
