import React from 'react';
import AuroraBlurredBackgroundA from '../../../../assets/images/aurora/bg-blur-a.png';
import AuroraBlurredBackgroundB from '../../../../assets/images/aurora/bg-blur-b.png';
import AuroraBlurredBackgroundC from '../../../../assets/images/aurora/bg-blur-c.png';
import { AuroraType } from './aurora-types';
import {
  AuroraForeground,
  AuroraContainer,
  AuroraBackground,
} from './aurora-components';
import { WeatherEasterEgg } from './weather-easter-egg/weather-easter-egg';
import { useWeather } from './weather-easter-egg/use-weather';

export interface AuroraProps {
  type?: AuroraType;
  className?: string;
}

export const Aurora = ({ type, className }: AuroraProps) => {
  const weather = useWeather();

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
          <WeatherEasterEgg weather={weather} />
        </AuroraForeground>
      </AuroraForeground>
    </AuroraContainer>
  );
};
