import SUN from '../../../../assets/images/aurora/sun.png';
import REFLECTION from '../../../../assets/images/aurora/sun-reflection.png';
import SUNSHINE from '../../../../assets/images/aurora/sun-shine.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import React from 'react';
import { getSunTime } from './weather-api';
import { getSunlightPercentage } from './sun-percentage-calculator';
import { Flare, FlareType } from './flare';
import { DefaultFlares } from './default-flares';

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
  left: calc(${(props) => props.timePercent}% - 167.5px);
  bottom: calc(
    ${(props) =>
      (1 / 125) * (-(props.timePercent - 50) * (props.timePercent - 50)) + 60}%
  );
  position: absolute;
  background-image: url(${SUN});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 335px;
  height: 335px;
`;

const AuroraSunReflectionDiv = styled.div<{ timePercent: number }>`
  background-image: url(${REFLECTION});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 549.5px;
  height: 539px;
  left: calc(
    ${(props) => props.timePercent}% +
      ${(props) => (props.timePercent - 50) / 2}% - 274.75px
  );
  bottom: calc(
    ${(props) =>
        (1 / 350) *
          -Math.pow(
            (props.timePercent + (props.timePercent - 50) / 2) * 2 - 100,
            2,
          ) +
        60}% - 100px
  );
  position: absolute;
`;

export const Sun = () => {
  const [time, setTime] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { sunriseTime, sunsetTime } = await getSunTime();
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      setTime(getSunlightPercentage(sunriseTime, sunsetTime));
    };

    if (sunrise === 0 || sunset === 0)
      fetchData().catch((e) => console.error(e));

    const interval = setInterval(() => {
      setTime(getSunlightPercentage(sunrise, sunset));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [sunset, sunrise, time]);

  return (
    <>
      <AuroraSunDiv timePercent={time}>
        <AuroraSunShineDiv />
      </AuroraSunDiv>
      <AuroraSunReflectionDiv timePercent={time} />
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
