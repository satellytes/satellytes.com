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
  text-align: right;
  /*"direction: rlt" aligns the text right in Safari*/
  direction: rtl;

  appearance: none;
  cursor: pointer;

  @media (max-width: 768px) {
    ${TextStyles.menuMetaMobile}
  }
`;

export const StyledChevron = styled(Icon)<{ isEnglish: boolean }>`
  cursor: pointer;
  /*margin-right: negative margin makes the Chevron clickable*/
  margin-right: ${(props) => (props.isEnglish ? '-26px' : '-22px')};
`;

export const LanguageSwitch = ({
  className = 'language-switch',
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();

  return (
    <StyledNav className={className}>
      <StyledChevron
        isEnglish={language === 'en'}
        show="caret_squared_down"
        ariaHidden={true}
      />
      <StyledSelection
        onChange={(event) => {
          changeLanguage(event.target.value);
        }}
        value={language}
        aria-label={t('navigation.language-aria')}
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
