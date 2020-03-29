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
  typography: {
    fontFamily: 'CocoGothic',
    fontSize: '16px',
  },
};

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${(props) => props.theme.palette.background.body};
      color: ${(props) => props.theme.palette.text.default};
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    font-family: ${(props) => props.theme.typography.fontFamily};, 'sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
