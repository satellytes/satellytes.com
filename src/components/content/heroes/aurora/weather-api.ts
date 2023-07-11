import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const latitude = 48.1351;
const longitude = 11.582;

export async function getWeather() {
  const apiUrl = BASE_URL + `?key=${API_KEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(apiUrl);
    const conditionCode = response.data.current.condition.code;
    return getWeatherDescription(conditionCode);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'NotSet';
  }
}

function getWeatherDescription(conditionCode) {
  switch (conditionCode) {
    case 1000:
      return 'Sunny';
    case 1003:
    case 1006:
      return 'Cloudy';
    case 1063:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1204:
    case 1207:
    case 1240:
    case 1243:
      return 'Rainy';
    case 1114:
    case 1117:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
      return 'Snowy';
    default:
      return 'NotSet';
  }
}
