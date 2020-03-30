import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './../header/header';
import { GlobalStyle, theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { Fonts } from './fonts/fonts';

const Layout: React.FC = ({ children }) => {
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
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Built with ❤️ by Satellytes</footer>
    </ThemeProvider>
  );
};

export default Layout;
