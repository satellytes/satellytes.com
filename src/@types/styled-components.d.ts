import 'styled-components';

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

declare module 'styled-components' {
  // structure is oriented at material-ui: https://material-ui.com/customization/default-theme/#default-theme
  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
      };
      text: {
        default: string;
        defaultLight: string;
        defaultDark: string;
        secondary: string;
        header: string;
        headerLight: string;
        topline: string;
        timestamp: string;
        link: {
          default: string;
          hover: string;
        };
        contrastLink: {
          default: string;
          hover: string;
          hoverTransparent: string;
        };
      };
      background: {
        bodyLight: string;
        body: string;
        card: string;
        footer: string;
        leadbox: string;
      };
    };
    breakpoints: Breakpoints;
    typography: {
      fontFamily: string;
      fontSize: string;
    };
    maxWidth: string;
  }
}
