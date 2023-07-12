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

export const CloudShape1 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(76.5, 121.12, 255) 0%,
    rgba(76.5, 121.12, 255, 0.15) 100%
  );
  border-radius: 485px;
  filter: blur(250px);
  height: 970px;
  left: 86px;
  position: absolute;
  top: 485px;
  width: 970px;
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudShape2 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(86, 80.98, 96.69) 0%,
    rgba(99.44, 98.73, 133.87, 0.15) 100%
  );
  border-radius: 547px;
  filter: blur(250px);
  height: 1094px;
  left: 509px;
  position: absolute;
  top: 305px;
  width: 1094px;
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay1 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  border-radius: 142px;
  box-shadow: inset 0 0 60px #00000080;
  height: 284px;
  left: 211px;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  top: 465px;
  width: 284px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay2 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  border-radius: 346.5px;
  box-shadow: inset 0 0 60px #00000080;
  height: 693px;
  left: 733px;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  top: 824px;
  transform: rotate(122.06deg);
  width: 693px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay3 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  border-radius: 166.5px;
  box-shadow: inset 0 0 60px #00000080;
  height: 333px;
  left: 414px;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  top: 500px;
  width: 333px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay4 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  border-radius: 154px;
  box-shadow: inset 0 0 60px #00000080;
  height: 308px;
  left: 1010px;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  top: 626px;
  width: 308px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay5 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  border-radius: 228.5px;
  box-shadow: inset 0 0 60px #00000080;
  height: 457px;
  left: 718px;
  mix-blend-mode: overlay;
  opacity: 0.2;
  position: absolute;
  top: 465px;
  width: 457px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;

export const CloudOverlay6 = styled.div`
  background: linear-gradient(
    180deg,
    rgb(44, 42, 90) 0%,
    rgba(42, 27, 113, 0.64) 100%
  );
  border-radius: 142.5px;
  height: 285px;
  left: 332px;
  mix-blend-mode: multiply;
  opacity: 0.1;
  position: absolute;
  top: 434px;
  width: 285px;
  filter: blur(25px);
  animation: ${cloudAnimation} ${getRandomDuration()} infinite alternate;
`;
