import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './../header/header';
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

interface LayoutProps {
  isIndexPage?: boolean;
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isIndexPage={props.isIndexPage} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTitleUrl={props.siteTitleUrl}
        light={!props.isIndexPage || Boolean(props.heroImage)}
        heroImage={props.heroImage}
        transparent={props.isIndexPage}
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
