import styled, { keyframes } from 'styled-components';

const getRandomValue = (min, max) => Math.random() * (max - min) + min;
const getRandomDuration = () => `${getRandomValue(8, 12)}s`;
const getRandomTransform = () =>
  `translate(${getRandomValue(-50, 50)}px, ${getRandomValue(-50, 50)}px)`;

const cloudAnimation = keyframes`
  0% {
    transform: ${getRandomTransform()};
  }
  50% {
    transform: ${getRandomTransform()};
  }
  100% {
    transform: ${getRandomTransform()};
  }
`;

export const CloudFrame = styled.div`
  background-color: #202840;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CloudWrapper = styled.div`
  background-color: var(--darkblue);
  border: 1px none;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

export const CloudGroup = styled.div`
  height: 100%;
  left: -286px;
  position: relative;
  top: -407px;
  width: 100%;
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlapGroup = styled.div`
  height: 100%;
  position: relative;
`;

export const CloudBackground = styled.div`
  background: linear-gradient(
    180deg,
    rgb(74.53, 73.24, 93.5) 0%,
    rgb(134.71, 134.71, 171.06) 100%
  );
  border-radius: 485px;
  filter: blur(250px);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const CloudShape = styled.div<{
  background: string;
  height: number;
  width: number;
  left: number;
  top: number;
}>`
  background: ${(props) => props.background};
  border-radius: 485px;
  filter: blur(250px);
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  position: absolute;
  top: ${(props) => props.top}px;
  width: ${(props) => props.width}px;
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay = styled.div<{
  height: number;
  width: number;
  top: number;
  left: number;
  customStyle?: string;
}>`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  box-shadow: inset 0 0 60px #00000080;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
  border-radius: 200px;

  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;

  ${(props) => props.customStyle}
`;
