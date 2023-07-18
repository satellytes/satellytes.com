import React, { useEffect, useState } from 'react';
import { getWeather } from './weather-easter-egg/weather-api';

import AuroraBlurredBackgroundA from '../../../../assets/images/aurora/bg-blur-a.png';
import AuroraBlurredBackgroundB from '../../../../assets/images/aurora/bg-blur-b.png';
import AuroraBlurredBackgroundC from '../../../../assets/images/aurora/bg-blur-c.png';

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

  const toggleWeather = () => {
    if (weather === WeatherType.NotSet) {
      getWeather()
        .then((weather) => {
          setWeather(weather);
        })
        .catch(() => {
          setWeather(WeatherType.NotSet);
        });
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
  const getSource = (type?: AuroraType) => {
    if (type === AuroraType.Pink) {
      return AuroraBlurredBackgroundB;
    }
    if (type === AuroraType.Blue) {
      return AuroraBlurredBackgroundC;
    }

    // default is the bright blue
    return AuroraBlurredBackgroundA;
  };
  return (
    <AuroraContainer className={className}>
      <AuroraBackground source={getSource(type)} weather={weather} />
      <AuroraForeground>
        <AuroraForeground>
          {flaresByWeather[weather || WeatherType.NotSet]}
        </AuroraForeground>
      </AuroraForeground>
    </AuroraContainer>
  );
};
