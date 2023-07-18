import React from 'react';
import styled, { keyframes } from 'styled-components';

const MAX_CLOUDS_PER_GROUP = 5;

interface CloudsProps {
  amount: number;
}

const getRandomValue = (min, max) => Math.random() * (max - min) + min;
const getRandomTransform = (distance) =>
  `translate(${getRandomValue(-distance, distance)}px, ${getRandomValue(
    -distance,
    distance,
  )}px)`;

const cloudAnimation = (distance) =>
  keyframes`
  0% {
    transform: ${getRandomTransform(distance)};
  }
  50% {
    transform: ${getRandomTransform(distance)};
  }
  100% {
    transform: ${getRandomTransform(distance)};
  }`;

const CloudsContainer = styled.div`
  width: 100%;
  height: 100%;

  background: linear-gradient(
    180deg,
    rgb(74, 73, 93) 0%,
    rgb(134, 134, 171) 100%
  );
`;

const CloudGroupContainer = styled.div`
  width: 25%;
  height: 200px;
  position: absolute;

  top: calc(${() => Math.floor(Math.random() * 100)}% - 200px);
  left: calc(${() => Math.floor(Math.random() * 100)}% - 200px);

  animation: ${() => cloudAnimation(50)} ${getRandomValue(9, 12)}s alternate
    infinite;
`;

export const Clouds = ({ amount }: CloudsProps) => {
  return (
    <CloudsContainer>
      {Array.from(Array(amount).keys()).map((i) => (
        <CloudGroup key={i} />
      ))}
    </CloudsContainer>
  );
};

export const CloudGroup = () => {
  const amount = Math.floor(Math.random() * MAX_CLOUDS_PER_GROUP) + 1;
  console.log(amount);
  return (
    <CloudGroupContainer>
      {Array.from(Array(amount).keys()).map((i) => (
        <Cloud key={i} />
      ))}
    </CloudGroupContainer>
  );
};

const Cloud = styled.div`
  --size: ${() => Math.floor(Math.random() * 400) + 100}px;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(
    180deg,
    rgb(200, 200, 200) 0%,
    rgba(200, 200, 200, 0.15) 100%
  );
  box-shadow: inset 0 0 60px #00000080;
  opacity: ${Math.random() * 0.5 + 0.1};
  filter: blur(${() => getRandomValue(30, 50)}px);
  border-radius: 1000px;

  position: absolute;
  top: ${() => Math.floor(Math.random() * 100)}%;
  left: ${() => Math.floor(Math.random() * 100)}%;

  animation: ${() => cloudAnimation(10)} ${getRandomValue(9, 12)}s alternate
    infinite;
`;
