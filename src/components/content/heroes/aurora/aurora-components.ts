import styled, { css } from 'styled-components';

const BACKGROUND_LAYER_Z = -2;
const FOREGROUND_LAYER_Z = -1;

interface AuroraBackgroundProps {
  source: string;
  overwriteBackground?: string;
}

export const AuroraBackground = styled.div<AuroraBackgroundProps>`
  ${(props) =>
    props.overwriteBackground !== undefined
      ? 'background: ' + props.overwriteBackground
      : 'background: #202840'};
  position: absolute;
  z-index: ${BACKGROUND_LAYER_Z};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  ${(props) =>
    props.overwriteBackground === undefined
      ? css`
          background-image: url(${props.source});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center -20vw;
        `
      : ''}
`;

export const AuroraForeground = styled.div`
  position: absolute;
  z-index: ${FOREGROUND_LAYER_Z};
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const AuroraContainer = styled.div`
  pointer-events: none;
`;
