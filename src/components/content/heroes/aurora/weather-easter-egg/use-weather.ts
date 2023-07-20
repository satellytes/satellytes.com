import { WeatherType } from './weather-types';
import { getWeather } from './weather-api';
import { JSX, useEffect, useState } from 'react';

interface WeatherProps {
  key?: string[];
  codes?: { [key: string]: WeatherType };
  customWeather?: { [key in WeatherType]: JSX.Element };
}

export const useWeather = (props: WeatherProps): WeatherType => {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  useEffect(() => {
    const toggleWeather = async () => {
      if (weather === WeatherType.NotSet) {
        setWeather(await getWeather());
      } else {
        setWeather(WeatherType.NotSet);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);
      if (
        event.ctrlKey &&
        event.altKey &&
        event.shiftKey &&
        props.key === undefined
      ) {
        toggleWeather();
      }
      if (
        props.key &&
        props.key.every(
          (key) =>
            (key.toLowerCase() === 'shift' && event.shiftKey) ||
            (key.toLowerCase() === 'alt' && event.altKey) ||
            (key.toLowerCase() === 'ctrl' && event.ctrlKey) ||
            key.toLowerCase() === event.key.toLowerCase(),
        )
      ) {
        toggleWeather();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [weather]);

  return weather;
};
