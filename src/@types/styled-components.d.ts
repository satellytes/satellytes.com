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
        header: string;
        headerLight: string;
      };
      background: {
        bodyLight: string;
        body: string;
        footer: string;
      };
    };
    breakpoints: Breakpoints;
    typography: {
      fontFamily: string;
      fontSize: string;
    };
  }
}
