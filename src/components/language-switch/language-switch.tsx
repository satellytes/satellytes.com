import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Link as LanguageLink } from 'gatsby-plugin-react-i18next/dist/Link';

const StyledLanguageLink = styled(LanguageLink)<{ selected?: boolean }>`
  border: unset;
  padding: unset;
  background-color: transparent;
  margin: 1px 0px 1px 12px;

  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
`;

export const LanguageSwitch = ({ translation }) => {
  const { languages, language, originalPath } = useI18next();

  const getTo = (languageOfLink) => {
    if (language === languageOfLink) return '';
    if (translation) return translation;
    else return originalPath;
  };

  return (
    <div>
      {languages.map((languageOfLink) => {
        return (
          <StyledLanguageLink
            key={languageOfLink}
            to={getTo(languageOfLink)}
            language={languageOfLink}
            selected={language === languageOfLink}
          >
            {languageOfLink}
          </StyledLanguageLink>
        );
      })}
    </div>
  );
};
