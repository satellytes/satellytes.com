import styled from 'styled-components';
import { WeatherType } from './aurora-types';
import { Flare, FlareType } from './flare';
import {
  CloudBackground,
  CloudFrame,
  CloudGroup,
  CloudOverlapGroup,
  CloudOverlay1,
  CloudOverlay2,
  CloudOverlay3,
  CloudOverlay4,
  CloudOverlay5,
  CloudOverlay6,
  CloudShape1,
  CloudShape2,
  CloudWrapper,
} from './clouds';
import PrecipitationEffect, { PrecipitationType } from './precipitationEffect';
import React from 'react';

const BACKGROUND_LAYER_Z = -2;
const FOREGROUND_LAYER_Z = -1;

interface AuroraBackgroundProps {
  source: string;
  weather?: WeatherType;
}

export const AuroraBackground = styled.div<AuroraBackgroundProps>`
  background: ${(props) => {
    switch (props.weather) {
      case WeatherType.Sunny:
        return '#3E61EE';
      case WeatherType.Rainy:
        return '#9BA3BB';
      case WeatherType.Snowy:
      case WeatherType.Cloudy:
      case WeatherType.NotSet:
      default:
        return '#202840';
    }
  }};
  position: absolute;

  background-image: url(${(props) => props.source});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center -20vw;
  z-index: ${BACKGROUND_LAYER_Z};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
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

export const AuroraRainyFlareColor1 = styled.div`
  right: -25%;
  top: -20%;
  width: 1094px;
  height: 1094px;
  border-radius: 1094px;
  background: linear-gradient(180deg, #150b28 0%, rgba(35, 33, 131, 0.15) 100%);
  filter: blur(125px);
  position: absolute;
`;

export const AuroraRainyFlareColor2 = styled.div`
  top: -65%;
  left: -30%;
  width: 970px;
  height: 970px;
  border-radius: 970px;
  background: linear-gradient(180deg, #2a275f 0%, #535364 100%);
  filter: blur(125px);
  position: absolute;
`;

export const AuroraRainyFlareColor3 = styled.div`
  bottom: -50%;
  left: -20%;
  width: 970px;
  height: 970px;
  border-radius: 970px;
  background: linear-gradient(
    180deg,
    #4d79ff 0%,
    rgba(77, 121, 255, 0.15) 100%
  );
  filter: blur(125px);
  position: absolute;
  opacity: 50%;
`;

export const AuroraRainyFlareColor4 = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #110f31 0%, rgba(77, 121, 255, 0.15) 90%);
  position: absolute;
`;

export const AuroraSnowyFlareColor1 = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(99, 93, 224, 0.6) 0%,
    rgba(77, 121, 255, 0) 90%
  );
  position: absolute;
`;

export const flaresByWeather: { [key in WeatherType] } = {
  [WeatherType.Sunny]: (
    <>
      <Flare
        opacity={0.9}
        speedMultiplier={0.1}
        stepSize={-80}
        flareType={FlareType.RADIAL}
        x={'20vw'}
        y={'40vh'}
        size={400}
        rotation={180}
      />
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
  [WeatherType.Cloudy]: (
    <CloudFrame key="clouds">
      <CloudWrapper>
        <CloudGroup>
          <CloudOverlapGroup>
            <CloudShape1 />
            <CloudBackground />
            <CloudShape2 />
            <CloudOverlay1 />
            <CloudOverlay2 />
            <CloudOverlay3 />
            <CloudOverlay4 />
            <CloudOverlay5 />
            <CloudOverlay6 />
          </CloudOverlapGroup>
        </CloudGroup>
      </CloudWrapper>
    </CloudFrame>
  ),
  [WeatherType.Rainy]: (
    <>
      <AuroraRainyFlareColor4 />
      <AuroraRainyFlareColor3 />
      <AuroraRainyFlareColor2 />
      <AuroraRainyFlareColor1 />
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
      <AuroraSnowyFlareColor1 />
      <PrecipitationEffect
        dropCount={100}
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
