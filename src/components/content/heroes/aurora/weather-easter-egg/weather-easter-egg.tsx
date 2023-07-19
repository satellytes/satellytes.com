import { flaresByWeather } from '../aurora-components';
import { WeatherType } from './weather-types';
import React from 'react';

interface WeatherEasterEggProps {
  weather: WeatherType;
}

export const WeatherEasterEgg = ({ weather }: WeatherEasterEggProps) => {
  return <>{flaresByWeather[weather || WeatherType.NotSet]}</>;
};
