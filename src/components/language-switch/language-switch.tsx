import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { Link } from '../links/links';

const UnstyledListItem = styled.li`
  list-style-type: none;
  display: inline;
`;

const StyledLanguageLink = styled(Link)<{ selected?: boolean }>`
  margin: 1px 0 1px 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
`;

export const LanguageSwitch = ({
  translation,
  className = 'language-switch',
}) => {
  const { languages, language, originalPath, t } = useI18next();
  const languageSwitchLabel = t('navigation.language-aria');

  return (
    <nav aria-label={languageSwitchLabel} className={className}>
      <ul>
        {languages.map((languageOfLink) => {
          return (
            <UnstyledListItem key={languageOfLink}>
              <StyledLanguageLink
                to={
                  language !== languageOfLink && translation
                    ? translation
                    : originalPath
                }
                language={languageOfLink}
                selected={language === languageOfLink}
              >
                {languageOfLink}
              </StyledLanguageLink>
            </UnstyledListItem>
          );
        })}
      </ul>
    </nav>
  );
};
