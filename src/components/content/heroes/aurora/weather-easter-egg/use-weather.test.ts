import { renderHook, act } from '@testing-library/react';
import { useWeather } from './use-weather';
import { getWeather } from './weather-api';
import { WeatherType } from './weather-types';

jest.mock('./weather-api');

describe('useWeather custom hook', () => {
  const mockGetWeather = getWeather as jest.Mock<Promise<WeatherType>>;

  beforeEach(() => {
    mockGetWeather.mockReset();
  });

  it('should return WeatherType.NotSet initially', () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current).toBe(WeatherType.NotSet);
  });

  it('should call getWeather function when ctrl+alt+shift key is pressed', async () => {
    mockGetWeather.mockResolvedValue(WeatherType.Sunny);

    const { result } = renderHook(() => useWeather());

    // Simulate the keydown event with ctrl+alt+shift
    await act(async () => {
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        altKey: true,
        shiftKey: true,
      });
      document.dispatchEvent(event);
    });

    expect(mockGetWeather).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(WeatherType.Sunny);
  });

  it('should reset weather to WeatherType.NotSet when ctrl+alt+shift is pressed again', async () => {
    mockGetWeather.mockResolvedValue(WeatherType.Cloudy);

    const { result } = renderHook(() => useWeather());

    // Simulate the keydown event with ctrl+alt+shift
    await act(async () => {
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        altKey: true,
        shiftKey: true,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(WeatherType.Cloudy);

    // Simulate the keydown event with ctrl+alt+shift again
    await act(async () => {
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        altKey: true,
        shiftKey: true,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(WeatherType.NotSet);
  });

  it('should not call getWeather function when other keys are pressed', async () => {
    const { result } = renderHook(() => useWeather());

    // Simulate the keydown event with ctrl+alt key (not ctrl+alt+shift)
    await act(async () => {
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        altKey: true,
      });
      document.dispatchEvent(event);
    });

    expect(mockGetWeather).toHaveBeenCalledTimes(0);
    expect(result.current).toBe(WeatherType.NotSet);
  });
});
