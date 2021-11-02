import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Chevron } from '../icons/chevron';

interface LanguageSwitchProps {
  translation: any;
  className?: string;
  $lightTheme?: boolean;
}
const StyledSelection = styled.select<{ $lightTheme: boolean }>`
  background: none;
  border: none;
  text-transform: uppercase;
  color: ${(props) =>
    props.$lightTheme
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};
  appearance: none;
  margin-left: 4px;
`;

export const LanguageSwitch = ({
  className = 'language-switch',
  $lightTheme,
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();

  return (
    <nav aria-label={t('navigation.language-aria')} className={className}>
      <Chevron />
      <StyledSelection
        onChange={(event) => {
          changeLanguage(event.target.value);
        }}
        value={language}
        $lightTheme={Boolean($lightTheme)}
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
