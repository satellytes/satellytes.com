import { getCustomBackground, WeatherEasterEgg } from './weather-easter-egg';
import { WeatherType } from './weather-types';
import { useWeather } from './use-weather';
import React from 'react';

export const useWeatherEasterEgg = () => {
  const weather: WeatherType = useWeather();
  const isWeatherEasterEggEnabled = weather !== WeatherType.NotSet;
  const WeatherComponent = <WeatherEasterEgg weather={weather} />;

  return {
    WeatherComponent,
    weatherBackground: getCustomBackground(weather),
    isWeatherEasterEggEnabled,
  };
};
