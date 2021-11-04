import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Chevron } from '../icons/chevron';

interface LanguageSwitchProps {
  translation: any;
  className?: string;
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}

const StyledNav = styled.nav<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
  transition: color 0.2s;
  color: ${(props) =>
    props.fromNavigation || props.$lightTheme
      ? props.theme.palette.text.default
      : props.theme.palette.text.header};
  &:hover {
    color: ${(props) =>
      props.fromNavigation
        ? props.theme.palette.text.header
        : !props.$lightTheme &&
          !props.fromNavigation &&
          props.theme.palette.text.headerHover};
  }
`;

const StyledSelection = styled.select<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
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

export const StyledChevron = styled(Chevron)<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
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
      <StyledChevron
        $lightTheme={$lightTheme}
        fromNavigation={fromNavigation}
      />
      <StyledSelection
        onChange={(event) => {
          changeLanguage(event.target.value);
        }}
        value={language}
        $lightTheme={$lightTheme}
        fromNavigation={fromNavigation}
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
