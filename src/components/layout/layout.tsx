import React, { ReactNode, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header, { HEADER_HEIGHT } from './../header/header';
import Navigation from './../navigation/navigation';
import { theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';
import { HeroImageLegacy } from '../header/hero-image-legacy';

/**
 * this container is used to push the footer to the bottom
 * if the page content is to short
 */
const FullHeightContainer = styled.div`
  display: flex;
  flex-direction: column;

  /** min-height: height of screen - fixed element (in this case: header) */
  min-height: calc(100vh - 56px);
`;

const Main = styled.main`
  flex-grow: 1;
  padding-bottom: 160px;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
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

const Layout = (props: LayoutProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const isLight = props.light === true && !overrideDarkFromQuery();

  useAnchorTagScrolling();

  setPolarityBodyClass(isLight);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle $lightTheme={isLight} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTitleUrl={props.siteTitleUrl}
        $lightTheme={isLight}
        transparent={props.transparentHeader || Boolean(props.heroImage)}
        showLanguageSwitch={props.showLanguageSwitch}
        translation={props.translation}
      />
      {/* pass in a hero node or try to use the hero image url */}
      {props.hero ?? <HeroImageLegacy image={props.heroImage} />}

      <FullHeightContainer>
        <Main>{props.children}</Main>
        <footer>
          <Navigation />
        </footer>
      </FullHeightContainer>
    </ThemeProvider>
  );
};

export default Layout;
