import React from 'react';
import { Link } from 'gatsby';
import { up } from '../breakpoint/breakpoint';
import styled from 'styled-components';

const NavWrapper = styled.div`
  width: 100%;
  height: 517px;
  position: fixed;
  bottom: 0;
  background-color: transparent;

  ${up('md')} {
    height: 660px;
  }
`;

const NavWrapperInner = styled.div`
  position: relative;
  background-color: #4d79ff;
  height: 100%;
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

const Navigation: React.FC = () => (
  <NavWrapper>
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
    </NavWrapperInner>
  </NavWrapper>
);

export default Navigation;
