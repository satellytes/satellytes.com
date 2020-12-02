import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { GRID_GAP_DESKTOP, GRID_GAP_MOBILE } from '../grid/grid';
import BurgerMenu from '../icons/burger-menu';
import { CloseBurgerMenuIcon } from '../icons/buttons-icons/close-burger-menu';
import { HeroImage } from './hero-image';
import { NavigationFlyout } from './menu-flyout';

export const HEADER_HEIGHT = '65px';

const StyledHeader = styled.header<{ light: number; transparent: number }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: background-color 0.3s;

  background-color: ${(props) =>
    props.transparent === 1
      ? 'none'
      : props.light === 1
      ? props.theme.palette.background.bodyLight
      : props.theme.palette.background.body};

  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  border-bottom: ${(props) =>
    props.light === 1
      ? '1px solid rgba(32, 40, 64, 0.05)'
      : '1px solid rgba(255, 255, 255, 0.1)'};

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

  /**
   * to make it simpler to click (especially on mobile), 
   * we make the button extra large
   */
  height: 100%;
  width: 50px;
  text-align: right;
  margin-right: -${() => GRID_GAP_MOBILE};
  padding-right: ${() => GRID_GAP_MOBILE};

  ${up('md')} {
    margin-right: -${() => GRID_GAP_DESKTOP};
    padding-right: ${() => GRID_GAP_DESKTOP};
  }

  rect {
    fill: ${(props) =>
      props.light === 1
        ? props.theme.palette.text.headerLight
        : props.theme.palette.text.header};
  }
`;

interface HeaderProps {
  siteTitle: string;
  siteTitleUrl?: string;
  light?: boolean;
  heroImage?: FluidObject | string;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(
    Boolean(props.transparent),
  );

  useEffect(() => {
    const onScroll = (): void => {
      if (props.transparent) {
        if (window.scrollY !== 0) {
          setIsHeaderTransparent(false);
        } else {
          setIsHeaderTransparent(true);
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <HeroImage image={props.heroImage}>
      <StyledHeader
        light={props.light ? 1 : 0}
        transparent={isHeaderTransparent ? 1 : 0}
      >
        <SiteTitle
          to={props.siteTitleUrl || '/'}
          light={!isHeaderTransparent && props.light ? 1 : 0}
        >
          {props.siteTitle}
        </SiteTitle>
        <SiteMenu
          aria-label="Open menu"
          light={!isHeaderTransparent && props.light ? 1 : 0}
          onClick={() => {
            setIsNavigationVisible(!isNavigationVisible);
          }}
        >
          {!isNavigationVisible ? <BurgerMenu /> : <CloseBurgerMenuIcon />}
        </SiteMenu>
        <NavigationFlyout visible={isNavigationVisible} />
      </StyledHeader>
    </HeroImage>
  );
};

export default Header;
