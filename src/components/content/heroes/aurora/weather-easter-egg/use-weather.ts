import { WeatherType } from './weather-types';
import { getWeather } from './weather-api';
import { useEffect, useState } from 'react';

export function useWeather() {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  const toggleWeather = () => {
    if (weather === WeatherType.NotSet) {
      getWeather()
        .then((weather) => {
          setWeather(weather);
        })
        .catch(() => {
          setWeather(WeatherType.NotSet);
        });
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
