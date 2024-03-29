import { WeatherType } from './weather-types';
import { getWeather } from './weather-api';
import { useEffect, useState } from 'react';

interface WeatherProps {
  key?: string[];
  codes?: { [key: string]: string };
}

export const useWeather = (props: WeatherProps): WeatherType => {
  const [weather, setWeather] = useState(WeatherType.NotSet);

  useEffect(() => {
    const toggleWeather = async () => {
      if (weather === WeatherType.NotSet) {
        setWeather(await getWeather(props.codes));
      } else {
        setWeather(WeatherType.NotSet);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.altKey &&
        event.shiftKey &&
        props.key === undefined
      ) {
        toggleWeather();
      } else {
        if (weather !== WeatherType.NotSet) {
          if (event.key === '1') {
            setWeather(WeatherType.Sunny);
          } else if (event.key === '2') {
            setWeather(WeatherType.Cloudy);
          } else if (event.key === '3') {
            setWeather(WeatherType.SlightlyCloudy);
          } else if (event.key === '4') {
            setWeather(WeatherType.Rainy);
          } else if (event.key === '5') {
            setWeather(WeatherType.Snowy);
          }
        }
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
