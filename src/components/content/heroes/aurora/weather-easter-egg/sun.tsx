import SUN from '../../../../../assets/images/aurora/sun.png';
import REFLECTION from '../../../../../assets/images/aurora/sun-reflection.png';
import SUNSHINE from '../../../../../assets/images/aurora/sun-shine.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';
import { getSunlightPercentage } from './sun-percentage-calculator';
import { Flare, FlareType } from '../flare';
import { DefaultFlares } from '../default-flares';

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

const rotatingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

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

const AuroraSunReflectionDiv = styled.div<{ timePercent: number }>`
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
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { sunriseTime, sunsetTime } = await getSunTime();
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      setTimePercent(getSunlightPercentage(sunriseTime, sunsetTime));
    };

    fetchData();

    const interval = setInterval(() => {
      setTimePercent(getSunlightPercentage(sunrise, sunset));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [sunrise, sunset]);

  return (
    <>
      <AuroraSunDiv timePercent={timePercent}>
        <AuroraSunShineDiv />
      </AuroraSunDiv>
      <AuroraSunReflectionDiv timePercent={timePercent} />
      <Flare
        stepSize={0}
        flareType={FlareType.LIGHT}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
      <Flare
        stepSize={20}
        flareType={FlareType.LIGHT}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
      <DefaultFlares />
    </>
  );
};
