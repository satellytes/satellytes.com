import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Chevron } from '../icons/chevron';

interface LanguageSwitchProps {
  translation: any;
  className?: string;
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}

const getTextColor = ({
  fromNavigation,
  $lightTheme,
  theme,
}: {
  fromNavigation?: boolean;
  $lightTheme?: boolean;
  theme: DefaultTheme;
}) => {
  if (fromNavigation || $lightTheme) {
    return theme.palette.text.default;
  } else {
    return theme.palette.text.header;
  }
};

const getTextHoverColor = ({
  fromNavigation,
  $lightTheme,
  theme,
}: {
  fromNavigation?: boolean;
  $lightTheme?: boolean;
  theme: DefaultTheme;
}) => {
  if (fromNavigation) {
    return theme.palette.text.header;
  } else if (!$lightTheme) {
    return theme.palette.text.headerHover;
  }
};

const StyledNav = styled.nav<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
  transition: color 0.2s;
  color: ${(props) => getTextColor(props)};
  &:hover {
    color: ${(props) => getTextHoverColor(props)};
  }
`;

const StyledSelection = styled.select`
  background: none;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: inherit;

  appearance: none;
  padding-left: 10px;
  cursor: pointer;
`;

export const StyledChevron = styled(Chevron)`
  margin-bottom: 2px;
  /*margin-right: -6px makes the Chevron clickable*/
  margin-right: -6px;
`;

export const LanguageSwitch = ({
  className = 'language-switch',
  $lightTheme,
  fromNavigation,
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();

  return (
    <StyledNav
      aria-label={t('navigation.language-aria')}
      className={className}
      $lightTheme={$lightTheme}
      fromNavigation={fromNavigation}
    >
      <StyledChevron />
      <StyledSelection
        onChange={(event) => {
          changeLanguage(event.target.value);
        }}
        value={language}
      >
        {languages.map((languageOfLink) => (
          <option value={languageOfLink} key={languageOfLink}>
            {languageOfLink}
          </option>
        ))}
      </StyledSelection>
    </StyledNav>
  );
};
