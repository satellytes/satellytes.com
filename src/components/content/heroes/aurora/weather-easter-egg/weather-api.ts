import axios from 'axios';
import { WeatherType } from './weather-types';

const API_KEY = process.env.GATSBY_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeather = async (
  customCodes: { [key: string]: string } | undefined,
) => {
  const apiUrl = `${BASE_URL}/current.json?key=${API_KEY}&q=auto:ip`;
  try {
    const response = await axios.get(apiUrl);
    const conditionCode = response.data.current.condition.code;
    return getWeatherDescription(conditionCode, customCodes);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return WeatherType.NotSet;
  }
};

export const getSunTime = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/astronomy.json?key=${API_KEY}&q=auto:ip`,
    );
    const { sunrise, sunset } = response.data.astronomy.astro;

    const sunriseTime = convertTimeStringToTimestamp(sunrise);
    const sunsetTime = convertTimeStringToTimestamp(sunset);

    return {
      sunriseTime,
      sunsetTime,
    };
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    return { sunriseTime: 0, sunsetTime: 0 };
  }
};

export function getWeatherDescription(
  conditionCode: number,
  customCodes: { [key: string]: string } | undefined,
): WeatherType {
  if (customCodes) {
    return (
      Object.keys(customCodes)
        .map((range) => {
          const customType = customCodes[range];
          const [start, end] = range.split('-').map(Number);
          if (start === conditionCode) {
            return customType as WeatherType;
          }
          if (conditionCode >= start && conditionCode <= end) {
            return customType as WeatherType;
          }
        })
        .find((weatherType) => weatherType !== undefined) || WeatherType.NotSet
    );
  }

  const weatherTypeMap = {
    '1000': WeatherType.Sunny,
    '1003': WeatherType.SlightlyCloudy,
    '1004-1030': WeatherType.Cloudy,
    '1063-1087': WeatherType.Rainy,
    '1114-1117': WeatherType.Snowy,
    '1135-1147': WeatherType.Cloudy,
    '1150-1153': WeatherType.Rainy,
    '1168-1171': WeatherType.Snowy,
    '1180-1207': WeatherType.Rainy,
    '1210-1237': WeatherType.Snowy,
    '1240-1252': WeatherType.Rainy,
    '1255-1264': WeatherType.Snowy,
    '1273-1279': WeatherType.Rainy,
    '1282': WeatherType.Snowy,
  };

  for (const range in weatherTypeMap) {
    const [start, end] = range.split('-').map(Number);
    if (start === conditionCode) {
      return weatherTypeMap[range];
    }
    if (conditionCode >= start && conditionCode <= end) {
      return weatherTypeMap[range];
    }
  }

  return WeatherType.NotSet;
}

export function convertTimeStringToTimestamp(timeString: string) {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');

  let hours24 = parseInt(hours);
  if (period.toLowerCase() === 'pm' && hours24 !== 12) {
    hours24 += 12;
  } else if (period.toLowerCase() === 'am' && hours24 === 12) {
    hours24 = 0;
  }

  const currentDate = new Date();
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours24,
    parseInt(minutes),
  );
  return newDate.getTime();
}
