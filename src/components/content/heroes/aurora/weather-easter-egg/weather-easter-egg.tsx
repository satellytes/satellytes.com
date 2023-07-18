import { flaresByWeather } from '../aurora-components';
import { WeatherType } from './weather-types';
import React from 'react';

export const WeatherEasterEgg = ({ weather }) => {
  return <>{flaresByWeather[weather || WeatherType.NotSet]}</>;
};
