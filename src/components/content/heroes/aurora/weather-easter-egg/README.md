# Weather Easter Egg

## Description
An Easter egg to display the current weather in Aurora

## Requirements
- [WeatherAPI](https://weatherapi.com/) API key as ```GATSBY_WEATHER_API_KEY``` environment variable

## Basic Usage
```jsx
import { useWeatherEasterEgg } from './weather-easter-egg/use-weather-easter-egg';

const { weatherBackground, WeatherComponent, isWeatherEasterEggEnabled } =
    useWeatherEasterEgg({});

// Your Component
return(
    <yourBackrgound overwriteBackground={weatherBackground}>
    {isWeatherEasterEggEnabled ? 
        WeatherComponent:
        ( 
            <normal content/> 
        )
    }
    </yourBackrgound>
)
```

## Advanced Usage
```jsx
import { useWeatherEasterEgg } from './weather-easter-egg/use-weather-easter-egg';

// Your Component
const { weatherBackground, WeatherComponent, isWeatherEasterEggEnabled } =
    useWeatherEasterEgg({
        key: ['alt', 'w', 'e'], // custom key combination
        codes: {
            '1282': 'Thunderstorm', // custom weather code can be any weather code from https://openweathermap.org/weather-conditions
            '1000-1003': 'Sunny', // or custom weather code range. The value can be a existing WeatherType (e.g. Sunny) or a new one (e.g. Thunderstorm)
        },
        customWeather: {
            'Thunderstorm': ( // overwrite the default weather component or add new one
                <div> // custom weather component
                    <h1>Thunderstorm</h1>
                </div>
            )
        }
    });

// same as above
```

## Components
### Clouds
Component to display clouds with animation

```jsx
import {Clouds} from './weather-easter-egg/components/clouds';
import {CloudType} from "./clouds";

return (
    <Clouds amount={10} type={CloudType.DARK}/> // amount of clouds and type of clouds. Type can be DARK or LIGHT
)
```

### PrecipitationEffect
Component to display precipitation with animation (Snow or Rain)

```jsx
import {PrecipitationEffect} from './weather-easter-egg/components/precipitation-effect';

return (
    <PrecipitationEffect
        type={PrecipitationType.SNOW} // type of precipitation. Type can be SNOW or RAIN
        dropCount={100} // amount of drops/flakes
        fallDuration={10} // duration of the fall in seconds
        speedDeviation={0.5} // max deviation of the speed of the drops/flakes in seconds
    /> 
)
```

### Rain
Component to display rain with animation using the PrecipitationEffect component

```jsx
import {Rain} from './weather-easter-egg/components/rain';

return (
    <Rain amount={100}/> // amount of rain drops
)
```

### Snow
Component to display snow with animation using the PrecipitationEffect component

```jsx
import {Snow} from './weather-easter-egg/components/snow';

return (
    <Snow amount={100}/> // amount of snow flakes
)
```

### Sun
Component to display a sun that is synchronized with the current time

```jsx
import {Sun} from './weather-easter-egg/components/sun';

return (
    <Sun/> // no props
)
```