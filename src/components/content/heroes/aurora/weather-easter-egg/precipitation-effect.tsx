import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface RaindropProps {
  color: string;
  fallDuration: number;
  blur: number;
  left: number;
  top: number;
  animation_delay: number;
}

interface SnowflakeProps {
  fallDuration: number;
  size: number;
  blur: number;
  transparency: number;
  left: number;
  top: number;
  animation_delay: number;
  snowflake?: PrecipitationData;
}

interface SnowflakeContainerProps {
  speed: number;
  top: number;
  left: number;
  animation_delay: number;
}

interface SplashProps {
  top: number;
  left: number;
  animation_delay: number;
}

interface PrecipitationData {
  id: number;
  color: string;
  fallDuration: number;
  delay: number;
  left: number;
}

interface SplashData {
  id: number;
  top: number;
  left: number;
  delay: number;
}

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

const splashAnimation = keyframes`
    0% {
        opacity: 1;
        transform: scale(0);
    }
    80% {
        opacity: 1;
        transform: scale(0);
    }
    90% {
        opacity: 0.5;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.5);
    }
`;

const generateSwayAnimation = (initialX: number, range: number) => keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(${initialX + Math.random() * range - range / 2}px);
    }
    100% {
        transform: translateX(${
          initialX + (Math.random() * range) / 2 - range / 4
        }px);
    }
`;

const swayAnimation = (snowflake: {
  left: number;
  fallDuration: number;
}) => css`
  ${generateSwayAnimation(snowflake.left, 400)} ${snowflake.fallDuration /
  3}s ease-in-out infinite alternate;
`;

const Splash = styled.div<SplashProps>`
  width: 25px;
  height: 30px;
  border-top: 4px dotted #84abd0;
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: ${splashAnimation} 0.5s linear infinite;
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation-delay: ${(props) => props.animation_delay}s;
`;

const Raindrop = styled.div<RaindropProps>`
  position: absolute;
  width: 4px;
  height: 50px;
  border-radius: 150%;
  background-color: ${(props) => props.color};
  animation: ${fallAnimation} ${(props) => props.fallDuration}s linear infinite;
  filter: blur(${(props) => props.blur}px);
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}px;
  animation-delay: ${(props) => props.animation_delay}s;
`;

const Snowflake = styled.div<SnowflakeProps>`
  animation-delay: ${(props) => props.animation_delay}s;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}%;
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 150%;
  animation: ${swayAnimation};
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, ${(props) => props.transparency}) 0%,
    rgba(255, 255, 255, ${(props) => props.transparency}) 20%,
    rgba(255, 255, 255, ${(props) => props.transparency * 0.8}) 85%,
    rgba(255, 252, 222, ${(props) => props.transparency}) 100%
  );
  filter: blur(${(props) => props.blur}px);
`;

const SnowflakeContainer = styled.div<SnowflakeContainerProps>`
  animation: ${fallAnimation} ${(props) => props.speed}s linear infinite;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}%;
  animation-delay: ${(props) => props.animation_delay}s;
`;

export enum PrecipitationType {
  Rain = 'rain',
  Snow = 'snow',
}

const PrecipitationEffect = ({
  dropCount,
  fallDuration,
  type,
  speedDeviation,
}) => {
  const [rainDrops, setRainDrops] = useState<PrecipitationData[]>([]);
  const [snowflakes, setSnowflakes] = useState<PrecipitationData[]>([]);
  const [splashes, setSplashes] = useState<SplashData[]>([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = Array.from({ length: dropCount }, (_, index) => ({
        id: index,
        color: '#84abd0',
        fallDuration:
          fallDuration + Math.random() * speedDeviation * 2 - speedDeviation ||
          1,
        delay: Math.random() * 5,
        left: Math.random() * 100,
      }));

      const newSplashes = Array.from({ length: dropCount / 4 }, (_, index) => ({
        id: index,
        top: Math.random() * 5 + 95,
        left: Math.random() * 100,
        delay: Math.random() * 5,
      }));

      if (type === PrecipitationType.Rain) {
        setRainDrops(newDrops);
        setSplashes(newSplashes);
      } else if (type === PrecipitationType.Snow) {
        setSnowflakes(newDrops);
      }
    };

    generateDrops();
  }, [dropCount, fallDuration, type, speedDeviation]);

  if (type === PrecipitationType.Rain) {
    return (
      <>
        {rainDrops.map((drop) => (
          <Raindrop
            key={drop.id}
            color={drop.color}
            fallDuration={drop.fallDuration}
            animation_delay={drop.delay}
            left={drop.left}
            top={-75}
            // 70% of the drops will have a blur between 0 and 3 px
            blur={Math.random() > 0.7 ? 0 : Math.random() * 3}
          />
        ))}
        {splashes.map((splash) => (
          <Splash
            key={splash.id}
            top={splash.top}
            left={splash.left}
            animation_delay={splash.delay}
          />
        ))}
      </>
    );
  } else if (type === PrecipitationType.Snow) {
    return (
      <>
        {snowflakes.map((snowflake) => {
          return (
            <SnowflakeContainer
              key={snowflake.id}
              speed={snowflake.fallDuration}
              left={snowflake.left}
              top={-75}
              animation_delay={snowflake.delay}
            >
              <Snowflake
                key={snowflake.id}
                fallDuration={snowflake.fallDuration}
                size={
                  (snowflake.fallDuration * 5 - snowflake.fallDuration * 3) *
                  1.5
                }
                snowflake={snowflake}
                left={snowflake.left}
                top={-75}
                animation_delay={snowflake.delay}
                blur={Math.random() > 0.7 ? 0 : Math.random() * 5} // 30% of the snowflakes will have a blur between 0 and 5 px
                transparency={Math.random() > 0.3 ? 1 : Math.random()} // 70% of the snowflakes will have a transparency between 0 and 1
              />
            </SnowflakeContainer>
          );
        })}
      </>
    );
  }

  return null;
};

export default PrecipitationEffect;
