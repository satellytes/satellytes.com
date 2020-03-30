// eslint-disable-next-line no-unused-vars
import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#668CFF',
    },
    text: {
      default: '#FFFFFF',
    },
    background: {
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

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${(props) => props.theme.palette.background.body};
    color: ${(props) => props.theme.palette.text.default}; 
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
