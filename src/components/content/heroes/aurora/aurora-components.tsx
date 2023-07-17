import styled, { css } from 'styled-components';
import { WeatherType } from './aurora-types';
import { Flare, FlareType } from './flare';
import { Clouds } from './clouds';
import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';
import { AuroraSun } from './sun';

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

export const AuroraRainyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #231f67 0%, rgba(77, 121, 255, 0.27) 90%);
  position: absolute;
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
  [WeatherType.Rainy]: (
    <>
      <AuroraRainyFlareColor />
      <Flare
        noAnimation={true}
        size={970}
        blur={125}
        background={
          'linear-gradient(180deg, #4d79ff 0%, rgba(77, 121, 255, 0.15) 100%)'
        }
        x={'38vw'}
        y={'25vh'}
      />
      <Flare
        noAnimation={true}
        size={970}
        background={'linear-gradient(180deg, #2a275f 0%, #535364 100%)'}
        blur={125}
        x={'30vw'}
        y={'15vh'}
      />
      <Flare
        noAnimation={true}
        size={1094}
        background={`linear-gradient(180deg, #150b28 0%, rgba(35, 33, 131, 0.15) 100%)`}
        blur={125}
        x={'64vw'}
        y={'64vh'}
      />
      <PrecipitationEffect
        dropCount={550}
        speed={1}
        type={PrecipitationType.Rain}
        speedDeviation={0.1}
      />
    </>
  ),
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
    </>
  ),
};
