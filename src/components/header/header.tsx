import React, { useState } from 'react';
import { Link } from 'gatsby';
import { up } from '../breakpoint/breakpoint';
import styled from 'styled-components';
import BurgerMenu from '../icons/burger-menu';
import { NavigationFlyout } from './menu-flyout';

export const HEADER_HEIGHT = '65px';

const StyledHeader = styled.header<{ light: boolean }>`
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: ${(props) =>
    props.light
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(32, 40, 64, 0.05)'};

  ${up('md')} {
    padding: 0 24px;
  }
`;

/**
 * We need to pass in a number instead of a boolean, otherwise we get an error
 * from styled components. GatsbyLink is passing all properties down to the DOM
 * and has therefore problems with a boolean.
 *
 * Issue: https://github.com/styled-components/styled-components/issues/1198
 */
const SiteTitle = styled(Link)<{ light: number }>`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) =>
    props.light === 1
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};
`;

const SiteMenu = styled.button<{ light: number }>`
  all: unset;
  cursor: pointer;

  rect {
    fill: ${(props) =>
      props.light === 1
        ? props.theme.palette.text.headerLight
        : props.theme.palette.text.header};
  }
`;

interface HeaderProps {
  siteTitle: string;
  light?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  return (
    <StyledHeader light={Boolean(props.light)}>
      <SiteTitle to="/" light={props.light ? 1 : 0}>
        {props.siteTitle}
      </SiteTitle>
      <SiteMenu
        light={props.light ? 1 : 0}
        onClick={() => {
          setIsNavigationVisible(!isNavigationVisible);
        }}
      >
        <BurgerMenu />
      </SiteMenu>
      <NavigationFlyout
        visible={isNavigationVisible}
        onClick={() => setIsNavigationVisible(!isNavigationVisible)}
      />
    </StyledHeader>
  );
};

export default Header;
