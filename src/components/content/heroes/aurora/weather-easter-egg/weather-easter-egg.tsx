import { WeatherType } from './weather-types';
import React from 'react';
import { Sun } from './sun';
import { Clouds, CloudType } from './clouds';
import { Snow } from './snow';
import { Rain } from './rain';
import { Flare, FlareType } from '../flare';
import { DefaultFlares } from '../default-flares';

interface WeatherEasterEggProps {
  weather: WeatherType;
}

export const WeatherEasterEgg = ({ weather }: WeatherEasterEggProps) => {
  switch (weather) {
    case WeatherType.Sunny:
      return <Sun />;
    case WeatherType.Cloudy:
      return <Clouds amount={20} type={CloudType.DARK} />;
    case WeatherType.SlightlyCloudy:
      return <Clouds amount={10} type={CloudType.LIGHT} />;
    case WeatherType.Snowy:
      return <Snow amount={50} />;
    case WeatherType.Rainy:
      return <Rain amount={550} />;
    case WeatherType.NotSet:
      return (
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
      );
  }
};