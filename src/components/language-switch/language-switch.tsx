import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Chevron } from '../icons/chevron';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';

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
    return theme.palette.text.header.default;
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
    return theme.palette.text.header.default;
  } else if (!$lightTheme) {
    return theme.palette.text.header.hover;
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
  display: flex;
  align-items: center;
`;

const StyledSelection = styled(Dropdown)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: inherit;
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
        onChange={(selectedOption) => {
          changeLanguage(selectedOption);
        }}
        value={language}
      >
        {languages.map((languageOfLink) => (
          <DropdownOption
            value={languageOfLink}
            key={languageOfLink}
            label={languageOfLink}
          >
            {languageOfLink == 'de' ? 'Deutsch' : 'English'}
          </DropdownOption>
        ))}
      </StyledSelection>
    </StyledNav>
  );
};
