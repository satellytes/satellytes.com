import { getSunlightPercentage } from './sun-percentage-calculator';

describe('getSunlightPercentage', () => {
  const sunriseTime = new Date('2023-07-14T06:00:00Z').getTime();
  const sunsetTime = new Date('2023-07-14T18:00:00Z').getTime();

  test('returns the correct sunlight percentage at noon', () => {
    const currentTime = new Date('2023-07-14T12:00:00Z').getTime();

    const result = getSunlightPercentage(sunriseTime, sunsetTime, currentTime);
    const expectedPercentage = 50;

    expect(result).toEqual(expectedPercentage);

    jest.useRealTimers();
  });

  test('returns 0% sunlight before sunrise', () => {
    const currentTime = new Date('2023-07-14T04:59:59Z').getTime();

    const result = getSunlightPercentage(sunriseTime, sunsetTime, currentTime);
    const expectedPercentage = 0;

    expect(result).toEqual(expectedPercentage);

    jest.useRealTimers();
  });

  test('returns 100% sunlight at sunset', () => {
    const currentTime = new Date('2023-07-14T18:00:00Z').getTime();

    const result = getSunlightPercentage(sunriseTime, sunsetTime, currentTime);
    const expectedPercentage = 100;

    expect(result).toEqual(expectedPercentage);

    jest.useRealTimers();
  });

  test('returns 100% sunlight after sunset', () => {
    const currentTime = new Date('2023-07-14T19:00:01Z').getTime();

    const result = getSunlightPercentage(sunriseTime, sunsetTime, currentTime);
    const expectedPercentage = 100;

    expect(result).toEqual(expectedPercentage);

    jest.useRealTimers();
  });

  test('returns 8% sunlight one hour after sunrise', () => {
    const currentTime = new Date('2023-07-14T07:00:00Z').getTime();

    const result = getSunlightPercentage(sunriseTime, sunsetTime, currentTime);
    const expectedPercentage = 8;

    expect(result).toEqual(expectedPercentage);

    jest.useRealTimers();
  });
});
