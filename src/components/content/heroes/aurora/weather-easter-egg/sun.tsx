import SUN from '../../../../../assets/images/aurora/sun.png';
import REFLECTION from '../../../../../assets/images/aurora/sun-reflection.png';
import SUNSHINE from '../../../../../assets/images/aurora/sun-shine.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';
import {
  getNighttimePercentage,
  getSunlightPercentage,
} from './daylight-percentage-calculator';
import { Flare, FlareType } from '../flare';
import { DefaultFlares } from '../default-flares';
import { Moon } from './moon';

const getSunYPosition = (timePercent: number) => {
  return (1 / 125) * (-(timePercent - 50) * (timePercent - 50)) + 60; // parabola formula to get the sun to move in a parabola
};

const getSunReflectionYPosition = (timePercent: number) => {
  return (
    (1 / 350) *
      -Math.pow(
        (timePercent + (timePercent - 50) / 2) * 2 - 100, // parabola formula to get the sun reflection to move in a parabola
        2,
      ) +
    60
  );
};

interface bgProps {
  time: number;
  sunrise: number;
  sunset: number;
}
const rotatingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const sunBackgroundAnimation = keyframes`
  0% {
    width: 500%;
    height: 500%;
    transform: translate(-25%, -25%);
  }
  7% {
    width: 0;
    height: 0;
  }
  93% {
    width: 0;
    height: 0;
  }
  100% {
    width: 500%;
    height: 500%;
    transform: translate(-25%, -25%);
  }
  `;

const backgroundAnimation = keyframes`
  0% {
    opacity: .7;
  }
  7% {
    opacity: 0;
  }
  93% {
    opacity: 0;
  }
  100% {
    opacity: .7;
  }
`;

const SunBackgroundDiv = styled.div<bgProps>`
  position: relative;
  background: radial-gradient(
    circle at 50% 50%,
    #ff6a00c4 0%,
    #ff6a00c4 50%,
    #ffffff00 100%
  );

  animation: ${sunBackgroundAnimation}
    ${(props) => (props.sunset - props.sunrise) / 1000}s linear infinite;
  animation-delay: ${(props) =>
    `-${((props.time / 100) * (props.sunset - props.sunrise)) / 1000}s`};
  z-index: -1;
  opacity: 0.7;
  border-radius: 500%;
  filter: blur(200px);
`;

const BackgroundDiv = styled.div<bgProps>`
  position: absolute;
  width: 100%;
  height: 120%;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 38, 38) 100%
  );
  z-index: -2;
  animation: ${backgroundAnimation}
    ${(props) => (props.sunset - props.sunrise) / 1000}s linear infinite;
  animation-delay: ${(props) =>
    `-${((props.time / 100) * (props.sunset - props.sunrise)) / 1000}s`};
`;

// Sunshine effect around the sun
const AuroraSunShineDiv = styled.div`
  background-image: url(${SUNSHINE});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: ${rotatingAnimation} 60s linear infinite;
  width: 200%;
  height: 200%;
  left: -50%;
  top: -50%;
  position: absolute;
`;

// The sun itself (in sync with real time)
const AuroraSunDiv = styled.div<{ timePercent: number }>`
  --width: 335px;
  transition: all 0.5s ease-out;
  left: calc(${(props) => props.timePercent}% - var(--width) / 2);
  bottom: calc(${(props) => getSunYPosition(props.timePercent)}%);
  position: absolute;
  background-image: url(${SUN});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: var(--width);
  height: 335px;
`;

// Lens flare effect on the sun
const AuroraSunReflectionDiv = styled.div<{ timePercent: number }>`
  transition: all 0.5s ease-out;
  --width: 549.5px;
  background-image: url(${REFLECTION});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: var(--width);
  height: 539px;
  left: calc(
    ${(props) => props.timePercent}% +
      ${(props) => (props.timePercent - 50) / 2}% - var(--width) / 2
      // linear formula to control the speed of the sun reflection
  );
  bottom: calc(
    ${(props) => getSunReflectionYPosition(props.timePercent)}% - 100px
  );
  position: absolute;
`;

export const Sun = () => {
  const [timePercent, setTimePercent] = useState(0);
  const [nightTimePercent, setNightTimePercent] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { sunriseTime, sunsetTime } = await getSunTime();
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      setTimePercent(
        getSunlightPercentage(sunriseTime, sunsetTime, +new Date() + 86400000),
      );
      setNightTimePercent(
        getNighttimePercentage(sunriseTime, sunsetTime, +new Date() + 86400000),
      );
    };

    fetchData();

    const interval = setInterval(() => {
      setTimePercent(
        getSunlightPercentage(sunrise, sunset, +new Date() + 86400000),
      );
      setNightTimePercent(
        getNighttimePercentage(sunrise, sunset, +new Date() + 86400000),
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [sunrise, sunset]);

  return (
    <>
      <BackgroundDiv sunrise={sunrise} sunset={sunset} time={timePercent} />
      <AuroraSunDiv timePercent={timePercent}>
        <SunBackgroundDiv
          sunrise={sunrise}
          sunset={sunset}
          time={timePercent}
        />
        <AuroraSunShineDiv />
      </AuroraSunDiv>
      <AuroraSunReflectionDiv timePercent={timePercent} />
      <Moon nightPercentage={nightTimePercent} />
      <Flare
        $stepSize={0}
        $flareType={FlareType.LIGHT}
        x={'70vw'}
        y={'300px'}
        size={100}
        $rotation={80}
        $animationOffset={14}
      />
      <Flare
        $stepSize={20}
        $flareType={FlareType.LIGHT}
        x={'50vw'}
        y={'50vw'}
        size={150}
        $rotation={30}
        $animationOffset={3}
      />
      <DefaultFlares />
    </>
  );
};
