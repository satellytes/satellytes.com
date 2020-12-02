import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Grid, GridItem } from '../grid/grid';
import { LinkedinWrapper } from '../icons/social/linkedin';
import { XingWrapper } from '../icons/social/xing';
import { GithubIconWrapper } from '../icons/social/github';

const NavigationBackground = styled.div`
  background: #4d79ff;
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

  padding: 80px 40px 30px 30px;

  ${up('md')} {
    padding: 10vw 80px 80px 80px;
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
  margin-top: 40px;

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
  ${up('md')} {
    display: inline-block;

    &:not(:last-of-type) {
      margin-right: 12px;
    }
  }
`;

const SocialLinks = styled.ul`
  all: unset;
  order: 2;

  ${up('md')} {
    order: 1;
    margin-bottom: 20px;
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

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  text-decoration: none;
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};

  /**
   * necessary for Safari
   */
  &:link {
    color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};
  }

  transition: 0.3s;

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

const SiteNavigationTitle = styled.span`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  line-height: 110%;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
`;

const SiteNavigationList = styled.ul`
  margin: 0;
`;

const NavigationListItem = styled.li`
  display: block;
`;

const SiteNavigationLink = styled(Link)<{ $isSelected: boolean }>`
  font-size: 32px;
  font-weight: bold;
  line-height: 150%;

  text-decoration: none;
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};

  /**
   * necessary for Safari
   */

  &:link {
    color: ${(props) => (props.$isSelected ? '#ffffff' : '#202840')};
  }

  ${up('md')} {
    font-size: 48px;
  }

  transition: color 0.3s;

  &:hover {
    color: #ffffff;
  }
`;

const Navigation: React.FC = (props) => {
  const [activePath, setActivePath] = useState('');
  useEffect(() => {
    setActivePath(window.location.pathname);
  });

  return (
    <NavigationBackground {...props}>
      <Grid center>
        <GridItem>
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
                    <LinkedinWrapper />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    title="Go to the Satellytes Xing profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.xing.com/companies/satellytesgmbh"
                  >
                    <XingWrapper />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    title="Go to the Satellytes Github profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/satellytes"
                  >
                    <GithubIconWrapper />
                  </SocialLink>
                </SocialLinkItem>
              </SocialLinks>
              <LegalLinks>
                <UnstyledListItem>
                  <LegalLink
                    to="/imprint"
                    $isSelected={activePath.includes('/imprint')}
                  >
                    Impressum
                  </LegalLink>
                </UnstyledListItem>
                <UnstyledListItem>
                  <LegalLink
                    to="/data-privacy"
                    $isSelected={activePath.includes('/data-privacy')}
                  >
                    Datenschutz
                  </LegalLink>
                </UnstyledListItem>
              </LegalLinks>
            </MetaContainer>
            <SiteNavigation>
              <SiteNavigationTitle>Menü</SiteNavigationTitle>
              <nav>
                <SiteNavigationList>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/services"
                      $isSelected={activePath.includes('/services')}
                    >
                      Leistungen
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/clients"
                      $isSelected={activePath.includes('/clients')}
                    >
                      Kunden
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/career"
                      $isSelected={activePath.includes('/career')}
                    >
                      Karriere
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/contact"
                      $isSelected={activePath.includes('/contact')}
                    >
                      Kontakt
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
