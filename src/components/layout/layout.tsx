import React, { ReactNode, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header, { HEADER_HEIGHT } from './../header/header';
import Navigation from './../navigation/navigation';
import { theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';
import { HeroImageLegacy } from '../header/hero-image-legacy';
import {
  Leadbox,
  LeadboxFooterContainer,
  LeadboxProps,
} from '../../new-components/leadbox/leadbox';
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
  flex-grow: 1;

  padding-bottom: 160px;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const HeaderStickyContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
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
  breadcrumb?: BreadcrumbEntry[];
  leadbox?: LeadboxProps;
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

const Layout = ({
  transparentHeader,
  heroImage,
  siteTitleUrl,
  light,
  hero,
  children,
  showLanguageSwitch = true,
  translation,
  breadcrumb,
  leadbox,
}: LayoutProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const isLight = light === true && !overrideDarkFromQuery();

  useAnchorTagScrolling();

  setPolarityBodyClass(isLight);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle $lightTheme={isLight} />
      <HeaderStickyContainer>
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteTitleUrl={siteTitleUrl}
          $lightTheme={isLight}
          transparent={transparentHeader || Boolean(heroImage)}
          showLanguageSwitch={showLanguageSwitch}
          translation={translation}
        />
      </HeaderStickyContainer>
      {/* pass in a hero node or try to use the hero image url */}
      {hero ?? <HeroImageLegacy image={heroImage} />}

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

export default Layout;
