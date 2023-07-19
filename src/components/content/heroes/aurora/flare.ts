import styled, { css } from 'styled-components';
import { WanderAnimation } from './aurora-animation';
import FlareTypeB from '../../../../assets/images/aurora/flare-type-b.png';
import FlareTypeA from '../../../../assets/images/aurora/flare-type-a.png';

const FLARE_ANIMATION_DURATION = 240;

export interface FlareProps {
  /**
   * what size, this translates to width & height, we always expect our image to fit into a square
   */
  size?: number;

  /**
   * the pure walking map is normalized (steps are always 0 or 1 in size)
   * we can use an existing css property to scale that value into a size we can see
   * The bigger the value, the bigger the area being walked on.
   */
  stepSize?: number;
  /**
   * The human eye spots similar animations really quickly
   * that's why we want to allow to rotate the entire animation with this value
   * This creates enough noise, so it looks like a distinct animation.
   */
  rotation?: number;
  /**
   * The actual animation has a fixed duration (currently 240s) to appear
   * very slowly. This multiplier allows to scale the value. A value of 2 means
   * half the time (120s) which makes the animation twice as fast. If you pass 0.5
   * the animation will run 480s (half the speed)
   */
  speedMultiplier?: number;
  /**
   * the actual center of the animation give by x & y
   * This again involves a custom CSS property which is made available
   * by the underlying animation to translate the flare into the desired location
   * while keeping the actual animation.
   */
  x?: string;
  y?: string;
  /**
   * we have two types of flares. One is light and one is dark.
   */
  flareType?: FlareType;
  /**
   * This is again to add more noise to the human eye
   * not to spot the fact that the actual animation is shared between all flares
   * The offset is given as a positive number and will be transformed
   * into a negative animation-delay (in seconds) which will cause the animation to start in-between.
   * The negative value is required to prevent any pause in the beginning.
   */
  animationOffset?: number;
  opacity?: number;
  background?: string;
  blur?: number;
  noAnimation?: boolean;
}

export enum FlareType {
  LIGHT = 'light',
  DARK = 'dark',
}

function getFlareImage(type: FlareType) {
  if (type === FlareType.DARK) {
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
  --flare-step-size: ${(props) => props.stepSize ?? 20}px;
  --flare-size: ${(props) => props.size ?? 100}px;
  --flare-rotate: ${(props) => props.rotation ?? 0}deg;
  --flare-x: ${(props) => props.x ?? 0};
  --flare-y: ${(props) => props.y ?? 0};
  --flare-opacity: ${(props) => props.opacity ?? 1};

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  opacity: var(--flare-opacity, 1);
  width: var(--flare-size, 100px);
  height: var(--flare-size, 100px);
  position: absolute;
  transform-origin: var(--flare-x, 0) var(--flare-y, 0);

  top: 0;
  left: 0;
  ${(props) =>
    props.background
      ? `background: ${props.background}; border-radius: 1000px;`
      : getFlareImage(props.flareType ?? FlareType.LIGHT)}
  filter: blur(${(props) => props.blur ?? 0}px);
  animation: ${WanderAnimation}
    ${(props) => FLARE_ANIMATION_DURATION * (1 / (props.speedMultiplier ?? 1))}s
    infinite linear;
  animation-delay: ${(props) => -1 * (props.animationOffset ?? 0)}s;
  ${(props) => (props.noAnimation ? 'animation: none;' : '')}

  transform: translate(var(--flare-x, 0), var(--flare-y, 0))
    translate(-50%, -50%);

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;
