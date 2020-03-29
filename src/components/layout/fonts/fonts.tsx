import { createGlobalStyle } from 'styled-components';
import CocoGothicWoff from './CocoGothic.woff';
import CocoGothicTtf from './CocoGothic.ttf';
import CocoGothicEot from './CocoGothic.eot';
import CocoGothicBoldWoff from './CocoGothic-Bold.woff';
import CocoGothicBoldTtf from './CocoGothic-Bold.ttf';
import CocoGothicBoldEot from './CocoGothic-Bold.eot';
import CocoGothicItalicWoff from './CocoGothic-Italic.woff';
import CocoGothicItalicTtf from './CocoGothic-Italic.ttf';
import CocoGothicItalicEot from './CocoGothic-Italic.eot';

export const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'CocoGothic';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('CocoGothic'),
         url(${CocoGothicWoff}) format('woff'),
         url(${CocoGothicTtf}) format('truetype'),
         url(${CocoGothicEot}) format('embedded-opentype');
  }

  @font-face {
      font-family: 'CocoGothic';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: local('CocoGothic Italic'),
           url(${CocoGothicItalicWoff}) format('woff'),
           url(${CocoGothicItalicTtf}) format('truetype'),
           url(${CocoGothicItalicEot}) format('embedded-opentype');
  }
  
  @font-face {
      font-family: 'CocoGothic';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: local('CocoGothic Bold'),
           url(${CocoGothicBoldWoff}) format('woff'),
           url(${CocoGothicBoldTtf}) format('truetype'),
           url(${CocoGothicBoldEot}) format('embedded-opentype');
  }
`;
