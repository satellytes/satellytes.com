import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import {
  GRID_GAP_DESKTOP,
  GRID_GAP_MOBILE,
  HEADER_HEIGHT_VALUE,
} from '../theme';
import { BurgerMenu } from '../../legacy/icons/header-icons/burger-menu';
import { CloseBurgerMenuIcon } from '../../legacy/icons/header-icons/close-burger-menu';
import { FLYOUT_Z_INDEX, NavigationFlyout } from './menu-flyout';
import { Link } from '../../legacy/links/links';
import { Swoosh } from '../../legacy/icons/header-icons/swoosh';

export const HEADER_HEIGHT = `${HEADER_HEIGHT_VALUE}px`;
const ESC_KEY_CODE = 27;

const StyledHeader = styled.header<{
  $lightTheme: boolean;
  $transparent: boolean;
}>`
  position: relative;
  width: 100%;
  transition: background 0.2s;

  background: ${(props) =>
    props.$transparent
      ? props.$lightTheme
        ? props.theme.palette.background.headerTransparent
        : 'none'
      : props.$lightTheme
        ? props.theme.palette.background.bodyLight
        : props.theme.palette.background.body};

  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  border-bottom: ${(props) =>
    props.$lightTheme && !props.$transparent
      ? '1px solid rgba(32, 40, 64, 0.05)'
      : 'none'};
`;

const HeaderSwoosh = styled(Swoosh)`
  position: absolute;
  bottom: calc(50% + 10px);
  width: 14px;
`;

/**
 * We need to pass in a number instead of a boolean, otherwise we get an error
 * from styled components. GatsbyLink is passing all properties down to the DOM
 * and has therefore problems with a boolean.
 *
 * Issue: https://github.com/styled-components/styled-components/issues/1198
 */
const SiteTitle = styled(Link)<{ $lightTheme: boolean }>`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s;

  color: ${(props) =>
    props.$lightTheme
      ? props.theme.palette.text.header.light
      : props.theme.palette.text.header.default};

  &:hover {
    color: ${(props) =>
      props.$lightTheme && props.theme.palette.text.header.hover};
  }
`;

const SiteMenu = styled.button<{ $lightTheme: boolean }>`
  all: unset;
  cursor: pointer;
  z-index: ${FLYOUT_Z_INDEX};

  /**
   * to make it simpler to click (especially on mobile),
   * we make the button extra large
   */
  height: 16px;
  width: 35px;
  text-align: right;
  margin-right: -${() => GRID_GAP_MOBILE};
  padding-right: ${() => GRID_GAP_MOBILE};

  ${up('md')} {
    margin-right: -${() => GRID_GAP_DESKTOP};
    padding-right: ${() => GRID_GAP_DESKTOP};
  }

  .bar {
    background-color: ${(props) =>
      props.$lightTheme
        ? props.theme.palette.text.header.light
        : props.theme.palette.text.header.default};
  }

  rect {
    fill: ${(props) =>
      props.$lightTheme
        ? props.theme.palette.text.header.light
        : props.theme.palette.text.header.default};
  }

  &:hover {
    .bar {
      background-color: ${(props) =>
        props.$lightTheme && props.theme.palette.text.header.hover};
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

interface HeaderProps {
  siteTitle: string;
  siteTitleUrl?: string;
  $lightTheme?: boolean;
  transparent?: boolean;
  translation?: string;
  showLanguageSwitch?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(
    Boolean(props.transparent),
  );
  const [hoverWithTransition, setHoverWithTransition] = useState(true);
  const burgerMenuRef = React.createRef<HTMLButtonElement>();

  const transparent = Boolean(props.transparent);

  useEffect(() => {
    setIsHeaderTransparent(transparent);
  }, [transparent]);

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

    // execute once to display properly on page refresh
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <StyledHeader
      $lightTheme={Boolean(props.$lightTheme)}
      $transparent={isHeaderTransparent}
      onKeyDown={(e) =>
        e.keyCode === ESC_KEY_CODE && setIsNavigationVisible(false)
      }
    >
      <SiteTitle
        to={props.siteTitleUrl || '/'}
        $lightTheme={Boolean(props.$lightTheme && !isHeaderTransparent)}
        aria-label={'Link to ' + props.siteTitle + ' homepage'}
      >
        <HeaderSwoosh />
        {props.siteTitle}
      </SiteTitle>
      <Wrapper>
        <SiteMenu
          aria-label="Open menu"
          $lightTheme={Boolean(!isHeaderTransparent && props.$lightTheme)}
          onClick={() => {
            setIsNavigationVisible(!isNavigationVisible);
            setHoverWithTransition(false);
          }}
          ref={burgerMenuRef}
        >
          {!isNavigationVisible ? (
            <BurgerMenu
              transition={hoverWithTransition}
              setHoverTransition={() => setHoverWithTransition(true)}
            />
          ) : (
            <CloseBurgerMenuIcon />
          )}
        </SiteMenu>
      </Wrapper>
      <NavigationFlyout
        visible={isNavigationVisible}
        showLanguageSwitch={Boolean(
          props.translation || props.showLanguageSwitch,
        )}
        translation={props.translation}
        setIsNavigationVisible={setIsNavigationVisible}
        burgerRef={burgerMenuRef}
      />
    </StyledHeader>
  );
};

export default Header;
