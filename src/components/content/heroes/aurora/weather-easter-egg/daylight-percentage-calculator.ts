export const getSunlightPercentage = (
  sunriseTime: number,
  sunsetTime: number,
  time: number,
) => {
  const totalDaylightMinutes = sunsetTime - sunriseTime;
  if (totalDaylightMinutes <= 0) {
    return 20;
  }
  const currentMinutes = time - sunriseTime;
  const sunlightPercentage = (currentMinutes / totalDaylightMinutes) * 100;

  if (sunlightPercentage < 0) {
    return 0;
  }
  if (sunlightPercentage > 100) {
    return 100;
  }
  return Math.round(sunlightPercentage);
};

export const getNighttimePercentage = (
  sunriseTime: number,
  sunsetTime: number,
  time: number,
) => {
  const totalNighttimeMinutes = sunriseTime - sunsetTime;
  if (totalNighttimeMinutes <= 0) {
    return 0;
  }
  const currentMinutes = time - sunsetTime;
  const nighttimePercentage = (currentMinutes / totalNighttimeMinutes) * 100;

  if (nighttimePercentage < 0) {
    return 0;
  }
  if (nighttimePercentage > 100) {
    return 100;
  }
  return Math.round(nighttimePercentage);
};
