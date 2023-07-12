import axios from 'axios';
import { WeatherType } from './aurora-types';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeather() {
  const apiUrl = `${BASE_URL}/current.json?key=${API_KEY}&q=auto:ip`;
  try {
    const response = await axios.get(apiUrl);
    const conditionCode = response.data.current.condition.code;
    return getWeatherDescription(conditionCode);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return WeatherType.NotSet;
  }
}

export function getWeatherDescription(conditionCode) {
  const weatherTypeMap = {
    '1000': WeatherType.Sunny,
    '1003-1009': WeatherType.Cloudy,
    '1030': WeatherType.Cloudy,
    '1063-1072': WeatherType.Rainy,
    '1087': WeatherType.Rainy,
    '1114-1153': WeatherType.Snowy,
    '1168-1171': WeatherType.Snowy,
    '1180-1219': WeatherType.Rainy,
    '1222': WeatherType.Rainy,
    '1225': WeatherType.Snowy,
    '1237-1243': WeatherType.Snowy,
    '1246-1258': WeatherType.Rainy,
    '1261-1279': WeatherType.Rainy,
    '1282': WeatherType.Rainy,
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
