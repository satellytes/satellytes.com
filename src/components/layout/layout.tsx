import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header, { HEADER_HEIGHT } from './../header/header';
import Navigation from './../navigation/navigation';
import { theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-style';
import { FluidObject } from 'gatsby-image';

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
}

const Layout: React.FC<LayoutProps> = (props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useAnchorTagScrolling();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle lightTheme={false} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTitleUrl={props.siteTitleUrl}
        lightTheme={false}
        heroImage={props.heroImage}
        transparent={props.transparentHeader || Boolean(props.heroImage)}
      />
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
