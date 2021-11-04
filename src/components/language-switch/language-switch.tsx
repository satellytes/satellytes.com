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

const StyledSelection = styled.select<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
  background: none;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) =>
    props.fromNavigation
      ? props.theme.palette.background.body
      : props.$lightTheme
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};

  appearance: none;
  margin-left: 4px;
  cursor: pointer;
`;

export const StyledChevron = styled(Chevron)<{
  $lightTheme?: boolean;
  fromNavigation?: boolean;
}>`
  margin-bottom: 2px;
  color: ${(props) =>
    props.fromNavigation
      ? props.theme.palette.background.body
      : props.$lightTheme
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};
`;

export const LanguageSwitch = ({
  className = 'language-switch',
  $lightTheme,
  fromNavigation,
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();

  return (
    <nav aria-label={t('navigation.language-aria')} className={className}>
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
    </nav>
  );
};
