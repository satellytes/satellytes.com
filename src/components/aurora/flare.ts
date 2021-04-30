import styled, { css } from 'styled-components';
import { WanderAnimation } from './aurora-animation';
import FlareTypeB from '../../images/aurora/flare-type-b.png';
import FlareTypeA from '../../images/aurora/flare-type-a.png';

const FLARE_ANIMATION_DURATION = 240;

interface FlareProps {
  size?: number;
  stepSize?: number;
  rotation?: number;
  speedMultiplier?: number;
  x?: string;
  y?: string;
  flareType?: 'a' | 'b';
  animationOffset?: number;
}
function getFlareImage(type: 'a' | 'b') {
  if (type === 'b') {
    return css`
      background-image: url(${FlareTypeB});
    `;
  } else {
    return css`
      background-image: url(${FlareTypeA});
    `;
  }
}

export const Flare = styled.div<FlareProps>`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;

  --flare-rotate: 0deg;
  width: var(--flare-size, 100px);
  height: var(--flare-size, 100px);
  position: absolute;
  transform-origin: var(--flare-x, 0) var(--flare-y, 0);

  top: 0;
  left: 0;

  --flare-step-size: ${(props) => props.stepSize ?? 20}px;
  --flare-size: ${(props) => props.size ?? 100}px;
  --flare-rotate: ${(props) => props.rotation ?? 0}deg;
  --flare-x: ${(props) => props.x ?? 0};
  --flare-y: ${(props) => props.y ?? 0};
  ${(props) => getFlareImage(props.flareType ?? 'a')}
  animation: ${WanderAnimation} ${(props) =>
    FLARE_ANIMATION_DURATION *
    (1 / (props.speedMultiplier ?? 1))}s infinite linear;
  animation-delay: ${(props) => -1 * (props.animationOffset ?? 0)}s;

  transform: translate(var(--flare-x, 0), var(--flare-y, 0))
    translate(-50%, -50%);

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;
