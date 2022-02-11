import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Dropdown, DropdownOption } from '../../forms/dropdown/dropdown';
import { Icon } from '../../ui/icon/icon';

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
    return theme.palette.text.header.light;
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
  if (fromNavigation || $lightTheme) {
    return theme.palette.text.header.hover;
  } else if (!$lightTheme) {
    return theme.palette.text.header.default;
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
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: inherit;
  padding: 4px 0 0 10px;
`;

const StyledIcon = styled(Icon)`
  /*margin-right: -15px makes the Caret clickable*/
  margin-right: -15px;
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
      <StyledIcon show="caret_squared_down" />
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
