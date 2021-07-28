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

const StyledLanguageSwitch = styled.button<{ selected?: boolean }>`
  border: unset;
  padding: unset;
  background-color: transparent;
  margin: 1px 0px 1px 12px;

  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
`;

export const LanguageSwitch = ({ translation }) => {
  const { languages, language, changeLanguage } = useI18next();
  if (translation) {
    // link to given url
    return (
      <div>
        {languages.map((lng) => {
          return (
            <StyledLanguageLink
              key={lng}
              to={language === lng ? '' : translation || ''}
              language={lng}
              selected={language === lng}
            >
              {lng}
            </StyledLanguageLink>
          );
        })}
      </div>
    );
  } else {
    // language switch (different locale, same pathname)
    return (
      <div>
        {languages.map((lng) => {
          return (
            <StyledLanguageSwitch
              key={lng}
              onClick={(e) => {
                e.preventDefault();
                changeLanguage(lng);
              }}
              selected={language === lng}
            >
              {lng}
            </StyledLanguageSwitch>
          );
        })}
      </div>
    );
  }
};
