import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Grid, GridItem } from '../grid/grid';
import { IconLinkedIn } from '../icons/social/linkedin';
import { IconTwitter } from '../icons/social/twitter';
import { IconXing } from '../icons/social/xing';

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
    padding: 120px 80px 80px 80px;
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
  margin: 0;
  padding: 0;
  order: 1;

  ${up('md')} {
    order: 2;
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

const LegalLink = styled(Link)`
  display: block;

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  text-decoration: none;
  color: #202840;

  /**
   * necessary for Safari
   */
  &:link {
    color: #202840;
  }

  ${up('md')} {
    display: inline-block;

    &:not(:last-of-type) {
      margin-right: 12px;
    }
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

interface SiteNavigationLinkProps {
  isselected: boolean;
}

const SiteNavigationLink = styled(Link)<SiteNavigationLinkProps>`
  font-size: 32px;
  font-weight: bold;
  line-height: 150%;

  text-decoration: none;
  color: #202840;

  /**
   * necessary for Safari
   */
  &:link {
    color: #202840;
  }

  ${up('md')} {
    font-size: 48px;
  }

  transition: 0.3s;
  &:hover {
    color: #ffffff;
  }

  ${({ isselected }) =>
    isselected &&
    `
    color: #ffffff;
  `}
`;

const Navigation: React.FC = (props) => {
  const isLinkSelected = (partialLink: string): boolean => {
    const isBrowser = typeof window !== `undefined`;
    const url = isBrowser ? window.location.href : '';
    const check = url.indexOf(partialLink);
    return check === -1 ? false : true;
  };

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
                    href="https://twitter.com/satellytes_beep"
                  >
                    <IconTwitter />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/satellytes"
                  >
                    <IconLinkedIn />
                  </SocialLink>
                </SocialLinkItem>
                <SocialLinkItem>
                  <SocialLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.xing.com/companies/satellytesgmbh"
                  >
                    <IconXing />
                  </SocialLink>
                </SocialLinkItem>
              </SocialLinks>
              <LegalLinks>
                <LegalLink to="/imprint">Imprint</LegalLink>
                <LegalLink to="/data-privacy">Data Privacy</LegalLink>
              </LegalLinks>
            </MetaContainer>
            <SiteNavigation>
              <SiteNavigationTitle>Nav</SiteNavigationTitle>
              <nav>
                <SiteNavigationList>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/services"
                      isselected={isLinkSelected('/services')}
                    >
                      Services
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/clients"
                      isselected={isLinkSelected('/clients')}
                    >
                      Clients
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/about"
                      isselected={isLinkSelected('/about')}
                    >
                      About
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/career"
                      isselected={isLinkSelected('/career')}
                    >
                      Career
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/contact"
                      isselected={isLinkSelected('/contact')}
                    >
                      Contact
                    </SiteNavigationLink>
                  </NavigationListItem>
                  <NavigationListItem>
                    <SiteNavigationLink
                      to="/blog"
                      isselected={isLinkSelected('/blog')}
                    >
                      Blog
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
