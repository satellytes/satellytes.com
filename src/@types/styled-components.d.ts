import 'styled-components';

declare module 'styled-components' {
  // structure is oriented at material-ui: https://material-ui.com/customization/default-theme/#default-theme
  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
        // contrastText: string;
      };
      text: {
        default: string;
        // title: string;
        // header: string;
        // subHeader: string;
        // footer: string;
      };
      background: {
        body: string;
        footer: string;
      };
      // action: {
      //   active: string;
      //   selected: string;
      // };
    };
    // breakpoints: {
    //   xs: string;
    //   sm: string;
    //   md: string;
    //   lg: string;
    //   xl: string;
    // };
    typography: {
      fontFamily: string;
      fontSize: string;
    };
  }
}
