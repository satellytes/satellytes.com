import React, { useEffect, useState } from 'react';
import { getWeather } from './weather-api';

import AuroraBlurredBackgroundA from '../../../../assets/images/aurora/bg-blur-a.png';
import AuroraBlurredBackgroundB from '../../../../assets/images/aurora/bg-blur-b.png';
import AuroraBlurredBackgroundC from '../../../../assets/images/aurora/bg-blur-c.png';

import { Flare, FlareType } from './flare';
import { AuroraType, WeatherType } from './aurora-types';
import {
  flaresByWeather,
  AuroraForeground,
  AuroraContainer,
  AuroraBackground,
} from './aurora-components';

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
        toggleWeather().then();
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
            opacity={0.6}
            speedMultiplier={0.5}
            stepSize={-80}
            flareType={FlareType.LIGHT}
            x={'20vw'}
            y={'0vh'}
            size={400}
            rotation={180}
          />
        </AuroraForeground>
      </AuroraForeground>
    </AuroraContainer>
  );
};
