import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fallAnimationRain = keyframes`
  0% {
    transform: translateY(-75px);
    opacity: 0;
  }
  100% {
    transform: translateY(150vh);
    opacity: 1;
  }
`;

const fallAnimationSnow = keyframes`
  0% {
    transform: translateY(-75px) translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateX(random(-100vw, 100vw));
  }
  100% {
    transform: translateY(150vh) translateX(0);
    opacity: 1;
  }
`;

const Raindrop = styled.div<{ color: string; speed: number }>`
  position: absolute;
  width: 3px;
  height: 50px;
  border-radius: 150%;
  background-color: ${(props) => props.color};
  animation: ${fallAnimationRain} ${(props) => props.speed}s linear infinite;
`;

const Snowflake = styled.div<{ speed: number; size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 150%;
  animation: ${fallAnimationSnow} ${(props) => props.speed}s linear infinite;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fff 0%,
    #fff 20.83%,
    rgba(255, 255, 255, 0.8) 85.94%,
    #fffcde 100%
  );
  filter: blur(2px);
`;

interface RainDropData {
  id: number;
  color: string;
  speed: number;
  delay: number;
  left: number;
}

export enum PrecipitationType {
  Rain = 'rain',
  Snow = 'snow',
}

const PrecipitationEffect = ({ dropCount, speed, type, speedDeviation }) => {
  const [rainDrops, setRainDrops] = useState<RainDropData[]>([]);
  const [snowflakes, setSnowflakes] = useState<RainDropData[]>([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = Array.from({ length: dropCount }, (_, index) => ({
        id: index,
        color: '#76a5d2',
        speed:
          speed + (Math.random() * (speedDeviation * 2) - speedDeviation) || 1,
        delay: Math.random() * 5,
        left: Math.random() * 100,
      }));

      if (type === PrecipitationType.Rain) {
        setRainDrops(newDrops);
      } else if (type === PrecipitationType.Snow) {
        setSnowflakes(newDrops);
      }
    };

    generateDrops();
  }, [dropCount, speed, type]);

  if (type === PrecipitationType.Rain) {
    return (
      <>
        {rainDrops.map((drop) => (
          <Raindrop
            key={drop.id}
            color={drop.color}
            speed={drop.speed}
            style={{
              left: `${drop.left}%`,
              top: '-75px',
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </>
    );
  } else if (type === PrecipitationType.Snow) {
    return (
      <>
        {snowflakes.map((drop) => (
          <Snowflake
            key={drop.id}
            speed={drop.speed}
            size={(30 - drop.speed * 3) * 1.75}
            style={{
              left: `${drop.left}%`,
              top: '-75px',
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </>
    );
  }

  return null;
};

export default PrecipitationEffect;
