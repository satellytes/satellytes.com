import React from 'react';
import styled, { keyframes } from 'styled-components';

const MAX_CLOUDS_PER_GROUP = 5;

interface CloudsProps {
  amount: number;
  type: CloudType;
}

interface CloudGroupProps {
  type: CloudType;
}

export enum CloudType {
  LIGHT = 'light',
  DARK = 'dark',
}

const getRandomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const getRandomTransform = (distance: number) =>
  `translate(${getRandomValue(-distance, distance)}px, ${getRandomValue(
    -distance,
    distance,
  )}px)`;

const cloudAnimation = (distance: number) =>
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

const CloudsContainer = styled.div<{ type: CloudType }>`
  width: 100%;
  height: 100%;

  background: linear-gradient(
    180deg,
    ${(props) => (props.type === CloudType.LIGHT ? '#8dedfd' : '#4a495d')} 0%,
    ${(props) => (props.type === CloudType.LIGHT ? '#49d6f6' : '#8686ab')} 100%
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

export const Clouds = ({ amount, type }: CloudsProps) => {
  return (
    <CloudsContainer type={type}>
      {Array.from(Array(amount).keys()).map((i) => (
        <CloudGroup key={i} type={type} />
      ))}
    </CloudsContainer>
  );
};

export const CloudGroup = ({ type }: CloudGroupProps) => {
  const amount = Math.floor(Math.random() * MAX_CLOUDS_PER_GROUP) + 1;
  console.log(amount);
  return (
    <CloudGroupContainer>
      {Array.from(Array(amount).keys()).map((i) => (
        <Cloud key={i} type={type} />
      ))}
    </CloudGroupContainer>
  );
};

const Cloud = styled.div<{ type: CloudType }>`
  --size: ${() => Math.floor(Math.random() * 400) + 100}px;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(
    180deg,
    ${(props) => (props.type == CloudType.DARK ? '#c8c8c8' : '#ffffff')} 0%,
    ${(props) => (props.type === CloudType.LIGHT ? '#ffffff' : '#c8c8c826')}
      100%
  );
  box-shadow: inset 0 0 60px
    ${(props) => (props.type == CloudType.DARK ? '#00000080' : '#ffffffbf')};
  opacity: ${Math.random() * 0.5 + 0.1};
  filter: blur(${() => getRandomValue(30, 50)}px);
  border-radius: 1000px;

  position: absolute;
  top: ${() => Math.floor(Math.random() * 100)}%;
  left: ${() => Math.floor(Math.random() * 100)}%;

  animation: ${() => cloudAnimation(10)} ${getRandomValue(9, 12)}s alternate
    infinite;
`;
