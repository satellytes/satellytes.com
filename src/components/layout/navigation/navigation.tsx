import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Link } from '../../legacy/links/links';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LanguageSwitch } from '../header/language-switch';
import { TextStyles } from '../../typography';
import { Icon } from '../../ui/icon/icon';
import { theme } from '../theme';

const NavigationBackground = styled.div`
  grid-column: 1 / 4;
  padding: 82px 24px 24px;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  justify-items: end;

  background: linear-gradient(289.7deg, #543fd7 2.95%, #2756fd 100.82%);
  clip-path: polygon(
    0 10vw /* left top */,
    100% 0 /* right top */,
    100% 100% /* right bottom */,
    0% 100% /* left bottom */
  );

  ${up('md')} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 18px;
    padding: 120px 80px 80px;
  }
`;

const LegalLinks = styled.ul`
  list-style-type: none;
  align-self: end;
  margin: 24px 0 0;
  padding: 0;

  display: flex;
  align-items: center;
  gap: 10px;

  ${up('md')} {
    grid-column: 1;
    grid-row: 2;
    justify-self: start;
    margin: 0;
  }
`;

const SocialLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  grid-column: 1;
  grid-row: 1 / 3;
  align-self: end;

  margin: 0;
  padding: 0;

  ${up('md')} {
    justify-self: start;
    grid-column: 1;
    grid-row: 1;
    flex-direction: row;
    margin-bottom: 24px;
  }
`;

const SocialLinkItem = styled.li`
  display: inline-block;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;

const SocialLink = styled.a`
  svg {
    vertical-align: middle;
  }

  display: inline-block;
`;

const LegalLink = styled(Link)<{ $isSelected: boolean }>`
  display: block;

  ${TextStyles.menuMeta}

  text-decoration: none;
  color: ${(props) =>
    props.$isSelected
      ? theme.palette.text.defaultLight
      : theme.palette.text.default};

  /**
   * necessary for Safari
   */

  &:link {
    color: ${(props) =>
      props.$isSelected
        ? theme.palette.text.defaultLight
        : theme.palette.text.default};
  }

  transition: color 0.2s;

  &:hover {
    color: ${theme.palette.text.defaultLight};
  }

  @media (max-width: 768px) {
    ${TextStyles.menuMetaMobile}
  }
`;

/**
 * Site navigation
 *
 */
const SiteNavigation = styled.div`
  grid-column: 2;
  grid-row: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;

  ${up('md')} {
    grid-column: 2;
    grid-row: 1 / 3;
    align-self: end;
  }
`;

const LanguageSwitchWrapper = styled(LanguageSwitch)`
  margin-bottom: 16px;
  align-self: flex-end;
`;

const SiteNavigationList = styled.ul`
  margin: 0;
`;

const NavigationListItem = styled.li`
  display: block;
`;

const SiteNavigationLink = styled(Link)<{ $isSelected: boolean }>`
  ${TextStyles.menuItemS}

  text-decoration: none;
  color: ${(props) =>
    props.$isSelected
      ? theme.palette.text.defaultLight
      : theme.palette.text.default};

  /**
   * necessary for Safari
   */

  &:link {
    color: ${(props) =>
      props.$isSelected
        ? theme.palette.text.defaultLight
        : theme.palette.text.default};
  }

  ${up('md')} {
    ${TextStyles.menuItemR}
  }

  transition: color 0.2s;

  &:hover {
    color: ${theme.palette.text.defaultLight};
  }
`;

const IconWrapper = styled.div`
  color: ${theme.palette.text.default};
  transition: color 0.2s;

  &:hover {
    color: ${theme.palette.text.defaultLight};
  }
`;

interface NavigationProps {
  showLanguageSwitch?: boolean;
  translation?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  showLanguageSwitch,
  translation,
}) => {
  const { t } = useTranslation();
  const [activePath, setActivePath] = useState('');
  useEffect(() => {
    setActivePath(window.location.pathname);
  });

  return (
    <NavigationBackground>
      <SocialLinks>
        <SocialLinkItem>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/satellytes"
            title="Open Satellytes LinkedIn profile in a new tab"
          >
            <IconWrapper>
              <Icon show="linked_in" />
            </IconWrapper>
          </SocialLink>
        </SocialLinkItem>
        <SocialLinkItem>
          <SocialLink
            title="Open Satellytes GitHub profile in a new tab"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/satellytes"
          >
            <IconWrapper>
              <Icon show="github" />
            </IconWrapper>
          </SocialLink>
        </SocialLinkItem>
      </SocialLinks>
      <LegalLinks>
        <li>
          <LegalLink
            to="/imprint"
            $isSelected={activePath.includes('/imprint')}
          >
            {t('navigation.imprint')}
          </LegalLink>
        </li>
        <li aria-hidden={true}>·</li>
        <li>
          <LegalLink
            to="/data-privacy"
            $isSelected={activePath.includes('/data-privacy')}
          >
            {t('navigation.data-privacy')}
          </LegalLink>
        </li>
      </LegalLinks>
      <SiteNavigation>
        {showLanguageSwitch && (
          <LanguageSwitchWrapper
            translation={translation}
            className={'language-switch'}
          />
        )}
        <nav>
          <SiteNavigationList>
            <NavigationListItem>
              <SiteNavigationLink
                to="/services"
                $isSelected={activePath.includes('/services')}
              >
                {t('navigation.services')}
              </SiteNavigationLink>
            </NavigationListItem>
            <NavigationListItem>
              <SiteNavigationLink
                to="/career"
                $isSelected={activePath.includes('/career')}
              >
                {t('navigation.career')}
              </SiteNavigationLink>
            </NavigationListItem>
            <NavigationListItem>
              <SiteNavigationLink
                to="/about-us"
                $isSelected={activePath.includes('/about-us')}
              >
                {t('navigation.about-us')}
              </SiteNavigationLink>
            </NavigationListItem>
            <NavigationListItem>
              <SiteNavigationLink
                to="/blog"
                $isSelected={activePath.includes('/blog')}
              >
                {t('navigation.blog')}
              </SiteNavigationLink>
            </NavigationListItem>
            <NavigationListItem>
              <SiteNavigationLink
                to="/contact"
                $isSelected={activePath.includes('/contact')}
              >
                {t('navigation.contact')}
              </SiteNavigationLink>
            </NavigationListItem>
          </SiteNavigationList>
        </nav>
      </SiteNavigation>
    </NavigationBackground>
  );
};
export default Navigation;
