import { WeatherType } from './weather-types';
import { getWeather } from './weather-api';
import { useEffect, useState } from 'react';

export function useWeather(): WeatherType {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  const toggleWeather = async () => {
    if (weather === WeatherType.NotSet) {
      setWeather(await getWeather());
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

  return weather;
}
