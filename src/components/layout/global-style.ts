import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ $lightTheme?: boolean }>`
  html {
    background-color: ${(props) =>
      props.$lightTheme
        ? props.theme.palette.background.bodyLight
        : props.theme.palette.background.body};
    color: ${(props) =>
      props.$lightTheme
        ? props.theme.palette.text.default
        : props.theme.palette.text.defaultLight}; 
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
  
  *:focus {
    outline: none
  }
  
  [data-whatintent='keyboard'] *:focus {
    outline: 4px solid #f4d03f;
  }
  
  
`;
