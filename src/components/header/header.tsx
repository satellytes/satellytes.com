import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { GRID_GAP_DESKTOP, GRID_GAP_MOBILE } from '../grid/grid';
import BurgerMenu from '../icons/burger-menu';
import { CloseBurgerMenuIcon } from '../icons/buttons-icons/close-burger-menu';
import { NavigationFlyout } from './menu-flyout';
import { Link } from '../links/links';
import { Swoosh } from '../icons/swoosh';
import { useI18next, Link as LanguageLink } from 'gatsby-plugin-react-i18next';

export const HEADER_HEIGHT = '65px';

const StyledHeader = styled.header<{
  $lightTheme: boolean;
  $transparent: boolean;
}>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: background-color 0.2s;

  background-color: ${(props) =>
    props.$transparent
      ? 'none'
      : props.$lightTheme
      ? props.theme.palette.background.bodyLight
      : props.theme.palette.background.body};

  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  border-bottom: ${(props) =>
    props.$lightTheme
      ? '1px solid rgba(32, 40, 64, 0.05)'
      : '1px solid rgba(255, 255, 255, 0.1)'};

  ${up('md')} {
    padding: 0 24px;
  }
`;

const LanguageSwitch = styled.button<{ selected?: boolean }>`
  border: unset;
  padding: unset;
  background-color: transparent;
  margin: 1px 0px 1px 12px;

  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
`;

const StyledLanguageLink = styled(LanguageLink)<{ selected?: boolean }>`
  border: unset;
  padding: unset;
  background-color: transparent;
  margin: 1px 0px 1px 12px;

  font-weight: bold;
  font-size: 14px;
  line-height: 110%;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;

  ${({ selected }) => (selected ? `color: #668CFF;` : `color: #FFFFFF;`)}
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
  color: ${(props) =>
    props.$lightTheme
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};
`;

const SiteMenu = styled.button<{ $lightTheme: boolean }>`
  all: unset;
  cursor: pointer;

  /**
   * to make it simpler to click (especially on mobile), 
   * we make the button extra large
   */
  height: 100%;
  width: 35px;
  text-align: right;
  margin-right: -${() => GRID_GAP_MOBILE};
  padding-right: ${() => GRID_GAP_MOBILE};

  ${up('md')} {
    margin-right: -${() => GRID_GAP_DESKTOP};
    padding-right: ${() => GRID_GAP_DESKTOP};
  }

  rect {
    fill: ${(props) =>
      props.$lightTheme
        ? props.theme.palette.text.headerLight
        : props.theme.palette.text.header};
  }
`;

interface HeaderProps {
  siteTitle: string;
  showLanguageSwitch?: boolean;
  siteTitleUrl?: string;
  $lightTheme?: boolean;
  transparent?: boolean;
  translation?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { languages, language, changeLanguage } = useI18next();
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

    // execute once to display properly on page refresh
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <StyledHeader
      $lightTheme={Boolean(props.$lightTheme)}
      $transparent={isHeaderTransparent}
    >
      <SiteTitle
        to={props.siteTitleUrl || '/'}
        $lightTheme={Boolean(!isHeaderTransparent && props.$lightTheme)}
      >
        <HeaderSwoosh />
        {props.siteTitle}
      </SiteTitle>
      <div>
        {props.translation
          ? languages.map((lng) => {
              return (
                <StyledLanguageLink
                  key={lng}
                  to={language === lng ? '' : props.translation || ''}
                  language={lng}
                  selected={language === lng}
                >
                  {lng}
                </StyledLanguageLink>
              );
            })
          : props.showLanguageSwitch &&
            languages.map((lng) => {
              return (
                <LanguageSwitch
                  key={lng}
                  onClick={(e) => {
                    e.preventDefault();
                    changeLanguage(lng);
                  }}
                  selected={language === lng}
                >
                  {lng}
                </LanguageSwitch>
              );
            })}
        <SiteMenu
          aria-label="Open menu"
          $lightTheme={Boolean(!isHeaderTransparent && props.$lightTheme)}
          onClick={() => {
            setIsNavigationVisible(!isNavigationVisible);
          }}
        >
          {!isNavigationVisible ? <BurgerMenu /> : <CloseBurgerMenuIcon />}
        </SiteMenu>
      </div>
      <NavigationFlyout visible={isNavigationVisible} />
    </StyledHeader>
  );
};

export default Header;
