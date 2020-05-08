import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ isIndexPage?: boolean }>`
  html {
    background-color: ${(props) =>
      props.isIndexPage
        ? props.theme.palette.background.body
        : props.theme.palette.background.bodyLight};
    color: ${(props) =>
      props.isIndexPage
        ? props.theme.palette.text.defaultLight
        : props.theme.palette.text.default}; 
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
