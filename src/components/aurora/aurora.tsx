import styled from 'styled-components';

import React from 'react';

const BACKGROUND_LAYER_Z = -1;
const FOREGROUND_LAYER_Z = 0;

import AuroraBlurredBackground from '../../images/aurora/bg-blur-mini.png';
import { Flare } from './flare';
const AuroraBackground = styled.div`
  background-color: #202840;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${AuroraBlurredBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center -20vw;
  z-index: ${BACKGROUND_LAYER_Z};
`;

const AuroraForeground = styled.div`
  position: fixed;
  z-index: ${FOREGROUND_LAYER_Z};
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;
const AuroraContainer = styled.div`
  pointer-events: none;
`;

export const Aurora = () => {
  return (
    <AuroraContainer>
      <AuroraBackground />
      <AuroraForeground>
        <Flare
          speedMultiplier={0.5}
          stepSize={-80}
          flareType={'a'}
          x={'20vw'}
          y={'0vh'}
          size={400}
          rotation={180}
        />
        <Flare
          speedMultiplier={2}
          stepSize={20}
          flareType={'a'}
          x={'20vw'}
          y={'100vh'}
          size={250}
          rotation={0}
        />
        <Flare
          stepSize={20}
          flareType={'b'}
          x={'50vw'}
          y={'50vw'}
          size={150}
          rotation={30}
          animationOffset={3}
        />
        <Flare
          stepSize={40}
          flareType={'a'}
          x={'80vw'}
          y={'20vw'}
          size={250}
          rotation={70}
          animationOffset={7}
        />
        <Flare
          stepSize={0}
          flareType={'b'}
          x={'70vw'}
          y={'300px'}
          size={100}
          rotation={80}
          animationOffset={14}
        />
      </AuroraForeground>
    </AuroraContainer>
  );
};
