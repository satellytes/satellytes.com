import { DefaultTheme } from 'styled-components';

export const HEADER_HEIGHT_VALUE = 65;
export const CONTENT_SPACE_SMALL = 80;
export const CONTENT_SPACE_LARGE = 180;

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
      topline: '#3E61EE',
      timestamp: 'rgba(0, 0, 0, 0.5)',
      errorMessage: '#FF0D35',
      header: {
        default: '#FFFFFF',
        light: '#3E61EE',
        hover: '#202840',
      },
      breadcrumb: 'rgba(0, 0, 0, 0.5)',
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
      headerTransparent:
        'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);',
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
