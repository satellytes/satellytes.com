import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../style-utils/breakpoint';
import { Grid, GridItem } from '../grid/grid';
import { LinkedinWrapper } from '../icons/social/linkedin';
import { XingWrapper } from '../icons/social/xing';
import { GithubIconWrapper } from '../icons/social/github';
import { Link } from '../links/links';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LanguageSwitch } from '../language-switch/language-switch';
import { TextStyles } from '../typography/typography-v2';

const NavigationBackground = styled.div`
  background: linear-gradient(289.7deg, #543fd7 2.95%, #2756fd 100.82%);
  clip-path: polygon(
    0 16vw /* left top */,
    100% 0 /* right top */,
    100% 100% /* right bottom */,
    0% 100% /* left bottom */
  );
`;

const NavigationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 80px 0 30px 0;

  ${up('md')} {
    padding: 10vw 0 80px 0;
    flex-direction: row;
  }
`;

/**
 * Meta navigation
 *
 */
const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  order: 2;

  width: 100%;
  margin-top: 54px;

  ${up('md')} {
    flex-direction: column;
    align-self: flex-end;
    align-items: flex-start;
    order: 1;

    width: auto;
    margin-top: 0;
  }
`;

const LegalLinks = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;
  order: 1;

  ${up('md')} {
    order: 2;
  }
`;

const UnstyledListItem = styled.li`
  &:not(:last-of-type) {
    margin-right: 24px;
    margin-bottom: 16px;
  }

  ${up('md')} {
    display: inline-block;

    &:not(:last-of-type) {
      margin-right: 24px;
      margin-bottom: 0;
    }
  }
`;

const SocialLinks = styled.ul`
  all: unset;
  order: 2;

  ${up('md')} {
    order: 1;
    margin-bottom: 24px;
  }
`;

const SocialLinkItem = styled.li`
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;

const SocialLink = styled.a`
  svg {
    vertical-align: middle;
  }
`;

const LegalLink = styled(Link)<{ $isSelected: boolean }>`
  display: block;

  ${TextStyles.menuMeta}

  text-decoration: none;
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};

  /**
   * necessary for Safari
   */
  &:link {
    color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};
  }

  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

/**
 * Site navigation
 *
 */
const SiteNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
  order: 1;

  ${up('md')} {
    order: 2;
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
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};

  /**
   * necessary for Safari
   */

  &:link {
    color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};
  }

  ${up('md')} {
    ${TextStyles.menuItemR}
  }

  transition: color 0.2s;

  &:hover {
    color: #ffffff;
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
      <Grid center>
        <GridItem xs={0} md={1} />
        <GridItem xs={12} md={10} noGap>
          <NavigationContent>
            <MetaContainer>
              <SocialLinks>
                <SocialLinkItem>
                  <SocialLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/satellytes"
                    title="Go to the Satellytes LinkedIn profile"
                  >
                    <LinkedinWrapper opacity={'0.3'} />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    title="Go to the Satellytes Xing profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.xing.com/companies/satellytesgmbh"
                  >
                    <XingWrapper opacity={'0.3'} />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    title="Go to the Satellytes Github profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/satellytes"
                  >
                    <GithubIconWrapper opacity={'0.3'} />
                  </SocialLink>
                </SocialLinkItem>
              </SocialLinks>
              <LegalLinks>
                <UnstyledListItem>
                  <LegalLink
                    to="/imprint"
                    $isSelected={activePath.includes('/imprint')}
                  >
                    {t('navigation.imprint')}
                  </LegalLink>
                </UnstyledListItem>
                <UnstyledListItem>
                  <LegalLink
                    to="/data-privacy"
                    $isSelected={activePath.includes('/data-privacy')}
                  >
                    {t('navigation.data-privacy')}
                  </LegalLink>
                </UnstyledListItem>
              </LegalLinks>
            </MetaContainer>
            <SiteNavigation>
              {showLanguageSwitch && (
                <LanguageSwitchWrapper
                  translation={translation}
                  className={'language-switch'}
                  fromNavigation
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
                      to="/office"
                      $isSelected={activePath.includes('/office')}
                    >
                      {t('navigation.office')}
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
          </NavigationContent>
        </GridItem>
      </Grid>
    </NavigationBackground>
  );
};
export default Navigation;
