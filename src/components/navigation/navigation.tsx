import React from 'react';
import { Link } from 'gatsby';
import { up } from '../breakpoint/breakpoint';
import styled from 'styled-components';
import { Twitter } from '../icons/social/twitter';
import { LinkedIn } from '../icons/social/linkedin';
import { Xing } from '../icons/social/xing';

const NavWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 517px;
  background-color: transparent;

  ${up('md')} {
    height: 660px;
  }
`;

const NavWrapperInner = styled.div`
  height: 100%;
`;

// following two elements create the angled background
const NavBackground = styled.div`
  position: absolute;
  bottom: 0;
  height: 70%;
  width: 100%;
  background: #4d79ff;
`;

const NavSlant = styled.div`
  position: absolute;
  top: 13%;
  left: -10%;
  transform: rotate(-9deg);
  height: 200px;
  width: 120%;
  background: #4d79ff;
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
  list-style-type: none;
`;

const NavListItem = styled.li`
  list-style: none;
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
    right: auto;
  }
`;

const SocialLinkItem = styled.div`
  cursor: pointer;
  margin-right: 16px;
  display: inline-block;
`;

const SocialLink = styled.a`
  svg {
    display: inline-block;
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
    <NavSlant />
    <NavBackground />
    <NavWrapperInner>
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
            <Twitter />
          </SocialLink>
        </SocialLinkItem>
        <SocialLinkItem>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com"
          >
            <LinkedIn />
          </SocialLink>
        </SocialLinkItem>
        <SocialLinkItem>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.xing.com"
          >
            <Xing />
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
    </NavWrapperInner>
  </NavWrapper>
);

export default Navigation;
