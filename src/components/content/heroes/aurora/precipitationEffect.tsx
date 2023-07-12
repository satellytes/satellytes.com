import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fallAnimation = keyframes`
  0% {
    transform: translateY(-75px);
    opacity: 0;
  }
  100% {
    transform: translateY(150vh);
    opacity: 1;
  }
`;

const swayAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(${Math.random() * 400 - 200}px);
  }
  100% {
    transform: translateX(${Math.random() * 200 - 100}px);
  }
`;

const Raindrop = styled.div<{ color: string; speed: number }>`
  position: absolute;
  width: 3px;
  height: 50px;
  border-radius: 150%;
  background-color: ${(props) => props.color};
  animation: ${fallAnimation} ${(props) => props.speed}s linear infinite;
`;

const Snowflake = styled.div<{ speed: number; size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 150%;
  animation: ${swayAnimation} ${(props) => props.speed / 3}s ease-in-out
    infinite alternate;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fff 0%,
    #fff 20.83%,
    rgba(255, 255, 255, 0.8) 85.94%,
    #fffcde 100%
  );
  filter: blur(2px);
`;
const SnowflakeContainer = styled.div<{ speed: number }>`
  animation: ${fallAnimation} ${(props) => props.speed}s linear infinite;
  position: absolute;
`;

interface precipitationData {
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
  const [rainDrops, setRainDrops] = useState<precipitationData[]>([]);
  const [snowflakes, setSnowflakes] = useState<precipitationData[]>([]);

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
  }, [dropCount, speed, type, speedDeviation]);

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
        {snowflakes.map((snowflake) => (
          <SnowflakeContainer
            key={snowflake.id}
            speed={snowflake.speed}
            style={{
              left: `${snowflake.left}%`,
              top: '-75px',
              animationDelay: `${snowflake.delay}s`,
            }}
          >
            <Snowflake
              key={snowflake.id}
              speed={snowflake.speed}
              size={(snowflake.speed * 5 - snowflake.speed * 3) * 1.75}
              style={{
                left: `${snowflake.left}%`,
                top: '-75px',
                animationDelay: `${snowflake.delay}s`,
              }}
            />
          </SnowflakeContainer>
        ))}
      </>
    );
  }

  return null;
};

export default PrecipitationEffect;
