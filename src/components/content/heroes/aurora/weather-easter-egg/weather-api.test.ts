import { WeatherType } from './weather-types';
import {
  convertTimeStringToTimestamp,
  getWeatherDescription,
} from './weather-api';
import axios, { AxiosResponse } from 'axios';
import { getSunTime } from './weather-api';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

jest.mock('axios');

describe('getWeatherDescription', () => {
  it.each([
    [1000, WeatherType.Sunny],
    [1003, WeatherType.SlightlyCloudy],
    [1006, WeatherType.Cloudy],
    [1009, WeatherType.Cloudy],
    [1030, WeatherType.Cloudy],
    [1063, WeatherType.Rainy],
    [1066, WeatherType.Rainy],
    [1069, WeatherType.Rainy],
    [1072, WeatherType.Rainy],
    [1087, WeatherType.Rainy],
    [1114, WeatherType.Snowy],
    [1117, WeatherType.Snowy],
    [1135, WeatherType.Snowy],
    [1147, WeatherType.Snowy],
    [1150, WeatherType.Snowy],
    [1153, WeatherType.Snowy],
    [1168, WeatherType.Snowy],
    [1171, WeatherType.Snowy],
    [1180, WeatherType.Rainy],
    [1183, WeatherType.Rainy],
    [1186, WeatherType.Rainy],
    [1189, WeatherType.Rainy],
    [1192, WeatherType.Rainy],
    [1195, WeatherType.Rainy],
    [1198, WeatherType.Rainy],
    [1201, WeatherType.Rainy],
    [1204, WeatherType.Rainy],
    [1207, WeatherType.Rainy],
    [1210, WeatherType.Rainy],
    [1213, WeatherType.Rainy],
    [1216, WeatherType.Rainy],
    [1219, WeatherType.Rainy],
    [1222, WeatherType.Rainy],
    [1225, WeatherType.Snowy],
    [1237, WeatherType.Snowy],
    [1240, WeatherType.Snowy],
    [1243, WeatherType.Snowy],
    [1246, WeatherType.Rainy],
    [1249, WeatherType.Rainy],
    [1252, WeatherType.Rainy],
    [1255, WeatherType.Rainy],
    [1258, WeatherType.Rainy],
    [1261, WeatherType.Rainy],
    [1264, WeatherType.Rainy],
    [1273, WeatherType.Rainy],
    [1276, WeatherType.Rainy],
    [1279, WeatherType.Rainy],
    [1282, WeatherType.Rainy],
    [19999, WeatherType.NotSet],
  ])(
    'should return the correct weather type for condition code %s',
    (conditionCode, expectedWeatherType) => {
      const actualWeatherType = getWeatherDescription(conditionCode);
      expect(actualWeatherType).toBe(expectedWeatherType);
    },
  );
});

describe('getSunTime', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return sunrise and sunset times', async () => {
    const responseData = {
      astronomy: {
        astro: {
          sunrise: '06:00 AM',
          sunset: '06:00 PM',
        },
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: responseData,
    } as AxiosResponse);

    const expectedSunriseTime = convertTimeStringToTimestamp('06:00 AM');
    const expectedSunsetTime = convertTimeStringToTimestamp('06:00 PM');

    const result = await getSunTime();

    expect(result.sunriseTime).toBe(expectedSunriseTime);
    expect(result.sunsetTime).toBe(expectedSunsetTime);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/astronomy.json?key=${API_KEY}&q=auto:ip`,
    );
  });
});

describe('convertTimeStringToTimestamp', () => {
  test('should convert time string to timestamp', () => {
    const timeString = '10:30 AM';
    const expectedTimestamp = new Date().setHours(10, 30, 0, 0);

    const result = convertTimeStringToTimestamp(timeString);

    expect(result).toEqual(expectedTimestamp);
  });

  test('should handle PM period correctly', () => {
    const timeString = '5:45 pm';
    const expectedTimestamp = new Date().setHours(17, 45, 0, 0);

    const result = convertTimeStringToTimestamp(timeString);

    expect(result).toEqual(expectedTimestamp);
  });

  test('should handle AM period correctly', () => {
    const timeString = '12:15 am';
    const expectedTimestamp = new Date().setHours(0, 15, 0, 0);

    const result = convertTimeStringToTimestamp(timeString);

    expect(result).toEqual(expectedTimestamp);
  });
});
