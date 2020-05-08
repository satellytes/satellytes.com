import React from 'react';
import { Link } from 'gatsby';
import { up } from '../breakpoint/breakpoint';
import styled from 'styled-components';
import { IconTwitter } from '../icons/social/twitter';
import { IconLinkedIn } from '../icons/social/linkedin';
import { IconXing } from '../icons/social/xing';

const NavWrapper = styled.div`
  position: relative;
  height: 517px;
  overflow: hidden;

  ${up('md')} {
    height: 660px;
  }
`;

const NavBackground = styled.div`
  position: absolute;
  top: 16vw;
  right: 0;
  left: 0;
  height: 100%;
  background: #4d79ff;
  transform: skewY(-9deg);
  transform-origin: top left;
`;

const NavTitle = styled.span`
  position: absolute;
  right: 43px;
  bottom: 422px;
  font-size: 14px;
  font-weight: bold;
  line-height: 110%;
  text-align: right;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  ${up('md')} {
    right: 81px;
    bottom: 525px;
  }
`;

const Nav = styled.nav`
  width: 132px;
  position: absolute;
  right: 43px;
  bottom: 117px;

  ${up('md')} {
    width: 195px;
    right: 81px;
    bottom: 76px;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
`;

const NavListItem = styled.li`
  display: block;
  text-align: right;
`;

const NavLink = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  line-height: 150%;
  text-decoration: none;
  color: #202840;

  ${up('md')} {
    font-size: 48px;
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: 40px;
  right: 26px;

  ${up('md')} {
    left: 80px;
    bottom: 133px;
  }
`;

const SocialLinkItem = styled.div`
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
`;

const SocialLink = styled.a`
  svg {
    vertical-align: middle;
  }
`;

const LegalLinks = styled.div`
  position: absolute;
  left: 31px;
  bottom: 33px;

  ${up('md')} {
    left: 80px;
    bottom: 91px;
  }
`;

const LegalLinkItem = styled.span`
  display: block;
  cursor: pointer;

  ${up('md')} {
    display: inline-block;
    margin-right: 16px;
  }
`;

const LegalLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #202840;
  text-decoration: none;
`;

const Navigation: React.FC = () => (
  <NavWrapper>
    <NavBackground />
    <NavTitle>Nav</NavTitle>
    <Nav>
      <NavList>
        <NavListItem>
          <NavLink to="/services">Services</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/clients">Clients</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/about">About</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/career">Career</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/blog">Blog</NavLink>
        </NavListItem>
      </NavList>
    </Nav>
    <SocialLinks>
      <SocialLinkItem>
        <SocialLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.twitter.com"
        >
          <IconTwitter />
        </SocialLink>
      </SocialLinkItem>
      <SocialLinkItem>
        <SocialLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com"
        >
          <IconLinkedIn />
        </SocialLink>
      </SocialLinkItem>
      <SocialLinkItem>
        <SocialLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.xing.com"
        >
          <IconXing />
        </SocialLink>
      </SocialLinkItem>
    </SocialLinks>
    <LegalLinks>
      <LegalLinkItem>
        <LegalLink to="/impressum">Impressum</LegalLink>
      </LegalLinkItem>
      <LegalLinkItem>
        <LegalLink to="/datenschutz">Datenschutz</LegalLink>
      </LegalLinkItem>
    </LegalLinks>
  </NavWrapper>
);

export default Navigation;
