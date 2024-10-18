import { useI18next } from 'gatsby-plugin-react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/icon/icon';
import { theme } from '../theme';
import { TextStyles } from '../../typography';

interface LanguageSwitchProps {
  translation: any;
  className?: string;
}

const StyledNav = styled.nav`
  position: relative;
  transition: color 0.2s;
  color: ${theme.palette.text.default};
  &:hover {
    color: ${theme.palette.text.defaultLight};
  }
`;

const DropdownButton = styled.button`
  ${TextStyles.menuMeta};
  background: none;
  border: none;
  color: inherit;
  padding-left: 18px;
  text-align: right;
  direction: rtl;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    ${TextStyles.menuMetaMobile}
  }
`;

const DropdownMenu = styled.ul<{ $isopen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 124px;
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const DropdownOption = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  color: #202840;
  text-align: left;
  width: 100%;
  border-radius: 4px;
  &:hover {
    background-color: #f9f9f9;
    color: #3e61ee;
  }
`;

export const StyledChevron = styled(Icon)`
  cursor: pointer;
`;

export const LanguageSwitch = ({
  className = 'language-switch',
}: LanguageSwitchProps) => {
  const { languages, language, t, changeLanguage } = useI18next();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (languageOfLink: string) => {
    changeLanguage(languageOfLink);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <StyledNav className={className} ref={dropdownRef}>
      <DropdownButton
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        aria-label={t('navigation.language-aria')}
      >
        {language === 'en' ? t('navigation.en') : t('navigation.de')}
        <StyledChevron show="caret_squared_down" />
      </DropdownButton>

      <DropdownMenu $isopen={isDropdownOpen}>
        {languages.map((languageOfLink) => (
          <DropdownOption
            key={languageOfLink}
            onClick={() => handleLanguageChange(languageOfLink)}
          >
            {languageOfLink === 'en' ? t('navigation.en') : t('navigation.de')}
          </DropdownOption>
        ))}
      </DropdownMenu>
    </StyledNav>
  );
};
