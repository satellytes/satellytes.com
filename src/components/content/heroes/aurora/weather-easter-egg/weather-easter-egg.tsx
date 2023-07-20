import { WeatherType } from './weather-types';
import React, { JSX } from 'react';
import { Sun } from './sun';
import { Clouds, CloudType } from './clouds';
import { Snow } from './snow';
import { Rain } from './rain';

interface WeatherEasterEggProps {
  weather: WeatherType;
  customWeather?: { [key: string]: JSX.Element };
}

const keysToWeatherTypes = (customWeather: { [key: string]: JSX.Element }) => {
  return Object.entries(customWeather).reduce(
    (convertedWeather, [key, value]) => ({
      ...convertedWeather,
      [key as WeatherType]: value,
    }),
    {},
  );
};

export const WeatherEasterEgg = ({
  weather,
  customWeather,
}: WeatherEasterEggProps): JSX.Element => {
  if (customWeather && keysToWeatherTypes(customWeather)[weather]) {
    return keysToWeatherTypes(customWeather)[weather];
  }
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
      return <></>;
  }
};

export const getCustomBackground = (weather: WeatherType) => {
  switch (weather) {
    case WeatherType.Sunny:
      return '#3E61EE';
    case WeatherType.Rainy:
      return '#76809b';
    case WeatherType.SlightlyCloudy:
      return '#5A6FC1';
    case WeatherType.NotSet:
      return undefined;
    default:
      return '#202840';
  }
};
