import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const latitude = 48.1351;
const longitude = 11.582;

export async function getWeather() {
  const apiUrl = BASE_URL + `?key=${API_KEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.current.condition.text;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'NotSet';
  }
}
