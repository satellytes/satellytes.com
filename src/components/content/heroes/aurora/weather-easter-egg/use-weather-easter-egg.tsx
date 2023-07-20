import { getCustomBackground, WeatherEasterEgg } from './weather-easter-egg';
import { WeatherType } from './weather-types';
import { useWeather } from './use-weather';
import React, { JSX } from 'react';

interface WeatherEasterEggProps {
  key?: string[];
  codes?: { [key: string]: WeatherType };
  customWeather?: { [key in WeatherType]: JSX.Element };
}

export const useWeatherEasterEgg = ({
  key,
  codes,
  customWeather,
}: WeatherEasterEggProps) => {
  const weather: WeatherType = useWeather({ key, codes, customWeather });
  const isWeatherEasterEggEnabled = weather !== WeatherType.NotSet;
  const WeatherComponent = <WeatherEasterEgg weather={weather} />;

  return {
    WeatherComponent,
    weatherBackground: getCustomBackground(weather),
    isWeatherEasterEggEnabled,
  };
};
