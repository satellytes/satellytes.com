import styled, { css } from 'styled-components';
import { WeatherType } from './weather-easter-egg/weather-types';
import { Flare, FlareType } from './flare';
import { Clouds, CloudType } from './weather-easter-egg/clouds';
import React from 'react';
import { DefaultFlares } from './default-flares';
import { Snow } from './weather-easter-egg/snow';
import { Rain } from './weather-easter-egg/rain';
import { Sun } from './weather-easter-egg/sun';

const BACKGROUND_LAYER_Z = -2;
const FOREGROUND_LAYER_Z = -1;

interface AuroraBackgroundProps {
  source: string;
  weather: WeatherType;
}

export const AuroraBackground = styled.div<AuroraBackgroundProps>`
  background: ${(props) => {
    switch (props.weather) {
      case WeatherType.Sunny:
        return '#3E61EE';
      case WeatherType.Rainy:
        return '#76809b';
      case WeatherType.SlightlyCloudy:
        return '#5A6FC1';
      default:
        return '#202840';
    }
  }};
  position: absolute;
  z-index: ${BACKGROUND_LAYER_Z};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  ${(props) =>
    props.weather === WeatherType.NotSet
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
