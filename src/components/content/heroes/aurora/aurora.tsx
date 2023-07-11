import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { getWeather } from './weather-api';

import AuroraBlurredBackgroundA from '../../../../assets/images/aurora/bg-blur-a.png';
import AuroraBlurredBackgroundB from '../../../../assets/images/aurora/bg-blur-b.png';
import AuroraBlurredBackgroundC from '../../../../assets/images/aurora/bg-blur-c.png';

import { Flare, FlareType } from './flare';
import PrecipitationEffect, { PrecipitationType } from './precipitationEffect';

const BACKGROUND_LAYER_Z = -2;
const FOREGROUND_LAYER_Z = -1;

export enum AuroraType {
  Pink = 'pink',
  Blue = 'blue',
  BrightBlue = 'bright-blue',
}

export enum WeatherType {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Snowy = 'Snowy',
  NotSet = 'Not set',
}

interface AuroraBackgroundProps {
  source: string;
  weather?: WeatherType;
}

const AuroraBackground = styled.div<AuroraBackgroundProps>`
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

const AuroraForeground = styled.div`
  position: absolute;
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

const AuroraRainyFlareBackground1 = styled.div`
  right: -25%;
  top: -20%;
  width: 1094px;
  height: 1094px;
  border-radius: 1094px;
  background: linear-gradient(180deg, #150b28 0%, rgba(35, 33, 131, 0.15) 100%);
  filter: blur(125px);
  position: absolute;
`;

const AuroraRainyFlareBackground2 = styled.div`
  top: -65%;
  left: -30%;
  width: 970px;
  height: 970px;
  border-radius: 970px;
  background: linear-gradient(180deg, #2a275f 0%, #535364 100%);
  filter: blur(125px);
  position: absolute;
`;

const AuroraRainyFlareBackground3 = styled.div`
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

const AuroraRainyFlareBackground4 = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #110f31 0%, rgba(77, 121, 255, 0.15) 90%);
  position: absolute;
`;

const AuroraSnowyFlareBackground1 = styled.div`
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

export interface AuroraProps {
  type?: AuroraType;
  className?: string;
}

export const Aurora = ({ type, className }: AuroraProps) => {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  const toggleWeather = async () => {
    if (weather === WeatherType.NotSet) {
      setWeather(await getWeather());
    } else {
      setWeather(WeatherType.NotSet);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.shiftKey) {
        toggleWeather();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  function getSource(type?: AuroraType) {
    if (weather !== WeatherType.NotSet) {
      return '';
    }
    if (type === AuroraType.Pink) {
      return AuroraBlurredBackgroundB;
    }
    if (type === AuroraType.Blue) {
      return AuroraBlurredBackgroundC;
    }

    // default is the bright blue
    return AuroraBlurredBackgroundA;
  }
  return (
    <AuroraContainer className={className}>
      <AuroraBackground source={getSource(type)} weather={weather} />
      <AuroraForeground>
        <AuroraForeground>
          {flaresByWeather[weather || WeatherType.NotSet]}
          <Flare
            key="flare-2"
            opacity={0.5}
            speedMultiplier={2}
            stepSize={20}
            flareType={FlareType.LIGHT}
            x={'20vw'}
            y={'90vh'}
            size={550}
            rotation={0}
          />
          ,
          <Flare
            key="flare-4"
            opacity={0.3}
            stepSize={40}
            flareType={FlareType.LIGHT}
            x={'80vw'}
            y={'20vw'}
            size={250}
            rotation={70}
            animationOffset={7}
          />
          ,
          <Flare
            key="flare-1"
            opacity={0.6}
            speedMultiplier={0.5}
            stepSize={-80}
            flareType={FlareType.LIGHT}
            x={'20vw'}
            y={'0vh'}
            size={400}
            rotation={180}
          />
          ,
        </AuroraForeground>
      </AuroraForeground>
    </AuroraContainer>
  );
};

const flaresByWeather: { [key in WeatherType] } = {
  [WeatherType.Sunny]: [
    <Flare
      key="flare-sun"
      opacity={0.9}
      speedMultiplier={0.1}
      stepSize={-80}
      flareType={FlareType.RADIAL}
      x={'20vw'}
      y={'40vh'}
      size={400}
      rotation={180}
    />,
    <Flare
      key="flare-5"
      stepSize={0}
      flareType={FlareType.LIGHT}
      x={'70vw'}
      y={'300px'}
      size={100}
      rotation={80}
      animationOffset={14}
    />,
    <Flare
      key="flare-3"
      stepSize={20}
      flareType={FlareType.LIGHT}
      x={'50vw'}
      y={'50vw'}
      size={150}
      rotation={30}
      animationOffset={3}
    />,
  ],
  [WeatherType.Cloudy]: [
    // Add your cloudy flares here
  ],
  [WeatherType.Rainy]: [
    <AuroraRainyFlareBackground4 key="flare-rainy-bg-4" />,
    <AuroraRainyFlareBackground3 key="flare-rainy-bg-3" />,
    <AuroraRainyFlareBackground2 key="flare-rainy-bg-2" />,
    <AuroraRainyFlareBackground1 key="flare-rainy-bg-1" />,
    <PrecipitationEffect
      dropCount={550}
      speed={1}
      type={PrecipitationType.Rain}
      key="rain"
    />,
  ],
  [WeatherType.Snowy]: [
    <AuroraSnowyFlareBackground1 key="flare-snowy-bg-1" />,
    <PrecipitationEffect
      dropCount={200}
      speed={5}
      type={PrecipitationType.Snow}
      key="snow"
    />,
  ],
  [WeatherType.NotSet]: [
    <Flare
      key="flare-3"
      stepSize={20}
      flareType={FlareType.DARK}
      x={'50vw'}
      y={'50vw'}
      size={150}
      rotation={30}
      animationOffset={3}
    />,
    <Flare
      key="flare-5"
      stepSize={0}
      flareType={FlareType.DARK}
      x={'70vw'}
      y={'300px'}
      size={100}
      rotation={80}
      animationOffset={14}
    />,
  ],
};
