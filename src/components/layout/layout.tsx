import React, { ReactNode } from 'react';
import Header, { HEADER_HEIGHT } from './header/header';
import Navigation from './navigation/navigation';
import { HEADER_HEIGHT_VALUE, theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';
import {
  Leadbox,
  LeadboxFooterContainer,
  LeadboxProps,
} from '../content/leadbox/leadbox';
import { up } from '../support/breakpoint';
import { Breadcrumb, BreadcrumbEntry } from './breadcrumb/breadcrumb';
import { setPolarityBodyClass } from './set-polarity';
import { useAnchorTagScrolling } from './use-anchor-tag-scrolling';

/**
 * this container is used to push the footer to the bottom
 * if the page content is to short
 */
const FullHeightContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  padding-top: ${HEADER_HEIGHT_VALUE}px;
  ${up('md')} {
    padding-top: ${HEADER_HEIGHT_VALUE}px;
  }
`;

const Main = styled.main`
  /** make the element take up all available space */
  flex-grow: 1;

  display: grid;

  /**
    The best reference for naming things comes from the css queen Rachel Andrew.
    Read the following if you need a refresher. 
    https://www.smashingmagazine.com/2017/10/naming-things-css-grid-layout/
   */

  grid-template-columns: minmax(24px, 1fr) minmax(0, 820px) minmax(24px, 1fr);
  grid-template-areas: 'margin-start content margin-end';

  /**
   * This technique comes from here:
   * https://www.joshwcomeau.com/css/full-bleed/
   */
  > * {
    grid-column: content;
  }

  /** make sure the distance to the footer is always the same */
  padding-bottom: 120px;

  ${up('md')} {
    padding-bottom: 160px;
  }
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

export const Layout = ({
  transparentHeader,
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
          transparent={transparentHeader}
          showLanguageSwitch={showLanguageSwitch}
          translation={translation}
        />
      </HeaderStickyContainer>
      {hero}
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
          <Navigation showLanguageSwitch={showLanguageSwitch} />
        </footer>
      </FullHeightContainer>
    </ThemeProvider>
  );
};
