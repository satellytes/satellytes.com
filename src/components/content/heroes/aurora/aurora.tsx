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
import { useWeatherEasterEgg } from './weather-easter-egg/use-weather-easter-egg';
import { DefaultFlares, DefaultFlaresDark } from './default-flares';

export interface AuroraProps {
  type?: AuroraType;
  className?: string;
}

export const Aurora = ({ type, className }: AuroraProps) => {
  const { weatherBackground, WeatherComponent, isWeatherEasterEggEnabled } =
    useWeatherEasterEgg({});

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
      <AuroraBackground
        source={getSource(type)}
        overwriteBackground={weatherBackground}
      />
      <AuroraForeground>
        {isWeatherEasterEggEnabled ? (
          WeatherComponent
        ) : (
          <>
            <DefaultFlaresDark />
            <DefaultFlares />
          </>
        )}
      </AuroraForeground>
    </AuroraContainer>
  );
};
