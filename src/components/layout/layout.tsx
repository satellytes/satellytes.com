import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './../header/header';
import Navigation from './../navigation/navigation';
import { theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { Fonts } from './fonts/fonts';
import { GlobalStyle } from './global-style';

const Main = styled.main`
  padding-bottom: 400px;
`;

interface LayoutProps {
  isIndexPage?: boolean;
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
      <Fonts />
      <GlobalStyle isIndexPage={props.isIndexPage} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        light={props.isIndexPage}
      />
      <Main>{props.children}</Main>
      <footer>
        <Navigation />
      </footer>
    </ThemeProvider>
  );
};

export default Layout;
