import axios from 'axios';
import { WeatherType } from './aurora';

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

function getWeatherDescription(conditionCode) {
  if (conditionCode === 1000) {
    return WeatherType.Sunny;
  } else if (conditionCode >= 1003 && conditionCode <= 1030) {
    return WeatherType.Cloudy;
  } else if (
    (conditionCode >= 1063 && conditionCode <= 1113) ||
    (conditionCode >= 1180 && conditionCode <= 1243) ||
    (conditionCode >= 1246 && conditionCode <= 1282)
  ) {
    return WeatherType.Rainy;
  } else if (conditionCode >= 1114 && conditionCode <= 1225) {
    return WeatherType.Snowy;
  } else {
    return WeatherType.NotSet;
  }
}
