import { flaresByWeather } from '../aurora-components';
import { WeatherType } from '../aurora-types';
import React from 'react';

export const WeatherEasterEgg = ({ weather }) => {
  return <>{flaresByWeather[weather || WeatherType.NotSet]}</>;
};
