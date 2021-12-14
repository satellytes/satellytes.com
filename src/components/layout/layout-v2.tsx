import React, { ReactNode } from 'react';

import Header, { HEADER_HEIGHT } from './../header/header';
import Navigation from './../navigation/navigation';
import {
  CONTENT_SPACE_LARGE,
  CONTENT_SPACE_SMALL,
  HEADER_HEIGHT_VALUE,
  theme,
} from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';
import {
  Leadbox,
  LeadboxFooterContainer,
  LeadboxProps,
} from '../../new-components/leadbox/leadbox';
import { up } from '../style-utils/breakpoint';
import { Breadcrumb, BreadcrumbEntry } from '../breadcrumb/breadcrumb';
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

  /** 
   * put the children into a container to give them a centered max width 
   * https://www.joshwcomeau.com/css/full-bleed/
   */
  display: grid;
  grid-template-columns:
    [main-start] minmax(24px, 1fr)
    [content-start] minmax(0, 820px) [content-end]
    minmax(24px, 1fr) [main-end];

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
          <Navigation />
        </footer>
      </FullHeightContainer>
    </ThemeProvider>
  );
};
