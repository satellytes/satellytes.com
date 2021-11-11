import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#668CFF',
    },
    text: {
      default: '#202840',
      defaultLight: '#FFFFFF',
      defaultDark: '#FFFFFF',
      secondary: 'rgba(32,40,64,0.5)',
      header: '#FFFFFF',
      headerLight: '#668CFF',
      link: {
        default: '#3E61EE',
        hover: '#4D79FF',
      },
      contrastLink: {
        default: '#4D79FF',
        hover: '#FFFFFF',
        hoverTransparent: 'rgba(77,121,255, 0.2)',
      },
    },
    background: {
      body: '#202840',
      bodyLight: '#FFFFFF',
      card: '#F5F6F7',
      footer: '#4D79FF',
      leadbox: '#F7F8FA',
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
  maxWidth: '1280px',
};
