/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './../header/header';
import { GlobalStyle, theme } from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { Fonts } from './fonts/fonts';

const Tower = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

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
      <Tower>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with ❤️ by Satellytes
        </footer>
      </Tower>
    </ThemeProvider>
  );
};

export default Layout;
