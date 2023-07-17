import styled, { css } from 'styled-components';
import { WeatherType } from './aurora-types';
import { Flare, FlareType } from './flare';
import { Clouds } from './clouds';
import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';
import { DefaultFlares } from './default-flares';
import { AuroraSun } from './sun';
import { Rain } from './rain';

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

export const AuroraSnowyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(73, 67, 203, 0.6) 0%,
    rgba(77, 121, 255, 0) 90%
  );
  position: absolute;
`;

export const flaresByWeather: { [key in WeatherType] } = {
  [WeatherType.Sunny]: (
    <>
      <AuroraSun />
      <Flare
        stepSize={0}
        flareType={FlareType.LIGHT}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
      <Flare
        stepSize={20}
        flareType={FlareType.LIGHT}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
    </>
  ),
  [WeatherType.Cloudy]: <Clouds amount={20} />,
  [WeatherType.Rainy]: <Rain amount={550} />,
  [WeatherType.Snowy]: (
    <>
      <AuroraSnowyFlareColor />
      <PrecipitationEffect
        dropCount={50}
        speed={10}
        type={PrecipitationType.Snow}
        speedDeviation={3}
      />
    </>
  ),
  [WeatherType.NotSet]: (
    <>
      <Flare
        stepSize={20}
        flareType={FlareType.DARK}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
      <Flare
        stepSize={0}
        flareType={FlareType.DARK}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
      <DefaultFlares />
    </>
  ),
};
