import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/icon/icon';
import { theme } from '../theme';
import { TextStyles } from '../../typography';

interface LanguageSwitchProps {
  translation: any;
  className?: string;
}

const StyledNav = styled.nav`
  transition: color 0.2s;
  color: ${theme.palette.text.default};
  &:hover {
    color: ${theme.palette.text.defaultLight};
  }
`;

const StyledSelection = styled.select`
  ${TextStyles.menuMeta};
  background: none;
  border: none;

  color: inherit;
  padding-left: 18px;

  appearance: none;
  cursor: pointer;
`;

export const StyledChevron = styled(Icon)`
  cursor: pointer;
  /*margin-right: -22px makes the Chevron clickable*/
  margin-right: -22px;
`;

export const LanguageSwitch = ({
  className = 'language-switch',
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();

  return (
    <StyledNav aria-label={t('navigation.language-aria')} className={className}>
      <StyledChevron show="caret_squared_down" />
      <StyledSelection
        onChange={(event) => {
          changeLanguage(event.target.value);
        }}
        value={language}
      >
        {languages.map((languageOfLink) => (
          <option value={languageOfLink} key={languageOfLink}>
            {languageOfLink === 'en' ? t('navigation.en') : t('navigation.de')}
          </option>
        ))}
      </StyledSelection>
    </StyledNav>
  );
};
