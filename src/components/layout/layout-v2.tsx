import React, { ReactNode, useEffect } from 'react';

import Header, { HEADER_HEIGHT } from './../header/header';
import Navigation from './../navigation/navigation';
import { theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';
import {
  Leadbox,
  LeadboxFooterContainer,
  LeadboxProps,
} from '../../new-components/leadbox/leadbox';
import { up } from '../breakpoint/breakpoint';
import { Breadcrumb, BreadcrumbEntry } from '../breadcrumb/breadcrumb';

/**
 * this container is used to push the footer to the bottom
 * if the page content is to short
 */
const FullHeightContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
`;

const Main = styled.main`
  /** make the element take up all available space */
  flex-grow: 1;

  /** 
   * put the children into a container to give them a centered max width 
   * https://www.joshwcomeau.com/css/full-bleed/
   */
  display: grid;
  grid-template-columns:
    1fr
    min(821px, calc(100% - 2 * 24px))
    1fr;

  > * {
    grid-column: 2;
  }

  /** make sure the distance to the footer is always the same */
  padding-bottom: 121px;

  ${up('md')} {
    padding-bottom: 160px;
  }
`;

export const FullWidth = styled.div`
  width: 100%;
  grid-column: 1 / 4;
`;

const HeaderStickyContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 520px;

  ${up('md')} {
    height: 640px;
  }
`;

const BreadcrumbContainer = styled.div<{ hero: boolean }>`
  margin: ${(props) => !props.hero && `calc(${HEADER_HEIGHT} + 16px)`} 24px 16px;
`;
const useAnchorTagScrolling = (): void => {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(
        `a[href*='${window.location.hash}']`,
      );
      if (target) {
        const scrollTop =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          // we need to scroll past the header and a little offset
          (Number.parseInt(HEADER_HEIGHT, 10) + 16);

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);
};

interface LayoutProps {
  transparentHeader?: boolean;
  heroImage?: FluidObject | string;
  siteTitleUrl?: string;
  light?: boolean;
  hero?: ReactNode;
  children?: ReactNode;
  showLanguageSwitch?: boolean;
  translation?: string;
  leadbox?: LeadboxProps;
  breadcrumb?: BreadcrumbEntry[];
}

enum POLARITY {
  DARK = 'dark',
  LIGHT = 'light',
}

function setPolarityBodyClass(isLight: boolean) {
  const POLARITY_PREFIX = `sy-polarity--`;
  const classNameDark = `${POLARITY_PREFIX}${POLARITY.DARK}`;
  const classNameLight = `${POLARITY_PREFIX}${POLARITY.LIGHT}`;

  const noBrowser = typeof window === 'undefined';

  if (noBrowser) {
    return;
  }

  if (isLight) {
    document.body.classList.remove(classNameDark);
    document.body.classList.add(classNameLight);
  } else {
    document.body.classList.remove(classNameLight);
    document.body.classList.add(classNameDark);
  }
}

/**
 * This will flash upon loading, but it's okay for debugging.
 * We also need a proper mechanic to incorporate user preference
 * and/or store manual overridden value (through a switch)
 * in the local storage.
 */

function overrideDarkFromQuery() {
  const noBrowser = typeof window === 'undefined';

  if (noBrowser) {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.has('dark');
}

export const LayoutV2 = ({
  transparentHeader,
  heroImage,
  siteTitleUrl,
  light,
  hero,
  children,
  showLanguageSwitch = true,
  translation,
  leadbox,
  breadcrumb,
}: LayoutProps): JSX.Element => {
  const isLight = light === true && !overrideDarkFromQuery();

  useAnchorTagScrolling();

  setPolarityBodyClass(isLight);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle $lightTheme={isLight} />
      <HeaderStickyContainer>
        <Header
          siteTitle="Satellytes"
          siteTitleUrl={siteTitleUrl}
          $lightTheme={isLight}
          transparent={transparentHeader || Boolean(heroImage)}
          showLanguageSwitch={showLanguageSwitch}
          translation={translation}
        />
      </HeaderStickyContainer>
      {hero && <HeroContainer>{hero}</HeroContainer>}
      {breadcrumb && (
        <BreadcrumbContainer hero={Boolean(hero)}>
          <Breadcrumb breadcrumbEntries={breadcrumb} />
        </BreadcrumbContainer>
      )}
      <FullHeightContainer>
        <Main>{children}</Main>
        {leadbox && (
          <LeadboxFooterContainer>
            <Leadbox {...leadbox} />
          </LeadboxFooterContainer>
        )}
        <footer>
          <Navigation />
        </footer>
      </FullHeightContainer>
    </ThemeProvider>
  );
};
