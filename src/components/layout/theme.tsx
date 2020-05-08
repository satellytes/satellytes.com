// eslint-disable-next-line no-unused-vars
import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#668CFF',
    },
    text: {
      default: '#000000',
      defaultLight: '#FFFFFF',
      header: '#668CFF',
      headerLight: '#FFFFFF',
    },
    background: {
      bodyLight: '#FFFFFF',
      body: '#202840',
      footer: '#4D79FF',
    },
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  typography: {
    fontFamily: 'CocoGothic',
    fontSize: '16px',
  },
};

export const GlobalStyle = createGlobalStyle<{ isIndexPage?: boolean }>`
  html {
    background-color: ${(props) =>
      props.isIndexPage
        ? props.theme.palette.background.body
        : props.theme.palette.background.bodyLight};
    color: ${(props) =>
      props.isIndexPage
        ? props.theme.palette.text.defaultLight
        : props.theme.palette.text.default}; 
  }
  
  body {
    font-family: ${(props) => props.theme.typography.fontFamily}, 
                "Helvetica", 
                "Lucida Grande", 
                Tahoma, 
                Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
