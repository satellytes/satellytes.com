import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#668CFF',
    },
    text: {
      default: '#202840',
      defaultLight: '#FFFFFF',
      header: '#668CFF',
      headerLight: '#FFFFFF',
      darkLinkColor: {
        default: '#668CFF',
        hover: '#4D79FF',
      },
      darkDefault: '#FFFFFF',
    },
    background: {
      body: '#202840',
      bodyLight: '#FFFFFF',
      card: '#F5F6F7',
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
