import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { getWeather } from './weather-api';

import AuroraBlurredBackgroundA from '../../../../assets/images/aurora/bg-blur-a.png';
import AuroraBlurredBackgroundB from '../../../../assets/images/aurora/bg-blur-b.png';
import AuroraBlurredBackgroundC from '../../../../assets/images/aurora/bg-blur-c.png';

import { Flare, FlareType } from './flare';

const BACKGROUND_LAYER_Z = -1;
const FOREGROUND_LAYER_Z = 0;

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
  background-color: ${(props) => {
    switch (props.weather) {
      case WeatherType.Sunny:
        return '#3E61EE';
      case WeatherType.Rainy:
        return '#9BA3BB';
      case WeatherType.Snowy:
        return '#202840';
      case WeatherType.Cloudy:
        return '#202840';
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

export interface AuroraProps {
  type?: AuroraType;
  className?: string;
}

export const Aurora = ({ type, className }: AuroraProps) => {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  const activateWeather = async () => {
    setWeather(await getWeather());
  };

  const deactivateWeather = () => {
    setWeather(WeatherType.NotSet);
  };

  const toggleWeather = () => {
    if (weather === WeatherType.NotSet) {
      activateWeather();
    } else {
      deactivateWeather();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the shortcut is pressed (Ctrl + Alt + Shift)
      if (event.ctrlKey && event.altKey && event.shiftKey) {
        toggleWeather();
      }
    };

    // Attach the keydown event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [weather]);
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
        <Flare
          opacity={0.6}
          speedMultiplier={0.5}
          stepSize={-80}
          flareType={FlareType.LIGHT}
          x={'20vw'}
          y={'0vh'}
          size={400}
          rotation={180}
        />
        <Flare
          opacity={0.5}
          speedMultiplier={2}
          stepSize={20}
          flareType={FlareType.LIGHT}
          x={'20vw'}
          y={'90vh'}
          size={550}
          rotation={0}
        />
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
          opacity={0.3}
          stepSize={40}
          flareType={FlareType.LIGHT}
          x={'80vw'}
          y={'20vw'}
          size={250}
          rotation={70}
          animationOffset={7}
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
      </AuroraForeground>
    </AuroraContainer>
  );
};
