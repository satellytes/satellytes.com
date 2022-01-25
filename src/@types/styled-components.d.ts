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
        topline: string;
        timestamp: string;
        errorMessage: string;
        header: {
          default: string;
          light: string;
          hover: string;
        };
        breadcrumb: string;
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
        headerTransparent: string;
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
