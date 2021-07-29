import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Link } from '../links/links';

const StyledLanguageLink = styled(Link)<{ selected?: boolean }>`
  margin: 1px 0px 1px 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
`;

export const LanguageSwitch = ({ translation }) => {
  const { languages, language, originalPath } = useI18next();

  return (
    <div>
      {languages.map((languageOfLink) => {
        return (
          <StyledLanguageLink
            key={languageOfLink}
            to={translation || originalPath}
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
