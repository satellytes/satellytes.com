import { useTranslation } from 'gatsby-plugin-react-i18next';
import { format, parseISO } from 'date-fns';
import { enGB, de } from 'date-fns/locale';
import React from 'react';
import { UseTranslationOptions } from 'react-i18next';

export const LONG_DATE_FORMAT = 'dd. MMMM yyyy';

/**
 * A custom  hook to read the current language
 * and return a formatter (date-fns) with the correct locale set
 * with the default being `enGB` for any unknown language.
 */
export const useLocaleFormat = (dateFormat) => {
  const { i18n } = useTranslation();

  const getLocale = (language) => {
    if (language === 'de') {
      return de;
    }

    return enGB;
  };

  return (date) => {
    try {
      return format(parseISO(date), dateFormat, {
        locale: getLocale(i18n.language),
      });
    } catch {
      return null;
    }
  };
};

export const useTranslationParagraphs = (
  ns?: string,
  options?: UseTranslationOptions<string>,
) => {
  const { t, ...useTranslationResponse } = useTranslation(ns, options);

  const tWithParagraphs = (key) => {
    const texts = t(key).split(/\n\s*\n/);

    return texts.map((text, index) => {
      const textWithBreaks = text
        .split(/\n/)
        .map((textContent, index) => [textContent, <br key={index} />])
        .flat();
      return <p key={index}>{textWithBreaks}</p>;
    });
  };

  return { t, tWithParagraphs, useTranslationResponse };
};
