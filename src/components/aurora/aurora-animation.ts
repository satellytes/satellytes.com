import { keyframes } from 'styled-components';
/**
 * Imagine a start position X,Y
 * We then start walking. Each entry describes in which direction we are going [x,y]
 * Allowed values are -1 (against axis), 0 (stay), 1 (direction of axis).
 * A value `[1,1]` means going one step right (`x = 1`), and one step up (`y = 1`)
 * A value `[0, -1]` means stat where you are on x but move one step down (y = -1)
 *
 * That map will be combined with a step size to walk bigger steps.
 * The actual starting position is not relevant and will be added by the transformation pipeline
 * just in addition.
 *
 * The map is roughly this pattern. I drew the ascii pattern and then manually transcribed it
 * as I didn't want to spend time processing it although it's fun, but it's distracting fun.
 * xxxxx
 * x    x   xx
 * xx    x x  x
 * xx    S   x
 * x        xx
 * x         x
 * xxxx      x
 * xxxx  x
 * xxxx
 *
 */
const WANDER_MAP = [
  [1, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 1],
  [0, 1],
  [1, 0],
  [0, 1],
  [0, 1],
  [-1, 1],
  [0, 1],
  [0, 1],
  [-1, 0],
  [-1, 0],
  [-1, 0],
  [-1, 0],
  [0, -1],
  [-1, 0],
  [-1, 0],
  [-1, 0],
  [0, -1],
  [-1, 0],
  [0, -1],
  [0, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [0, -1],
  [0, -1],
  [1, 0],
  [1, 0],
  [1, 0],
  [1, 0],
  [1, 0],
  [1, -1],
  [1, -1],
  [1, -1],
  [-1, 1],
  [-1, 1],
  [0, 1],
  [0, 1],
  [0, 1],
];
/**
 * I'm simply to lazy to author tons of keyframes
 * derived from our wander map, that's why this transformation exists
 * which we use together with the keyframes helper. It's supposed to run exactly once during startup.
 */
const wanderFrames = transformMapToCssKeyframes(WANDER_MAP);
console.log(wanderFrames);
export const WanderAnimation = keyframes`${wanderFrames}`;

/**
 * creates an animation frame given a percentage (0 - 1) and the desired position.
 * We will then compose a transformation mixed with CSS Variables
 * in order to control the center, size and rotation of the animation.
 * The only static information we encode is the "normalized" walking map with absolute
 * instead of relative movements.
 *
 * This is an actual output of the function:
 *
 * ```
 * 23%   {
 *   transform:
 *        rotate(calc(var(--flare-rotate, 0deg)))
 *        translate(calc(5 * var(--flare-step-size, 10px)), calc(4 * var(--flare-step-size, 10px)))
 *        translate(var(--flare-x, 0), var(--flare-y, 0))
 *        translate(-50%, -50%);
 * }
 * ```
 *
 * which boils down to this structure:
 *
 * ```
 * 15% {
 *   transform:
 *    rotate: .. (rotate everything to create a variation)
 *    translate .. (walk)
 *    translate .. (start position)
 *    translate .. (centered)
 * }
 * ```
 */

function transformMapToCssKeyframes(values) {
  const total = values.length - 1;
  let xAbsolute = 0;
  let yAbsolute = 0;
  const transformSteps: string[] = [];

  for (const [index, [x, y]] of values.entries()) {
    const stepPercent = Math.ceil((index / total) * 100);
    xAbsolute += x;
    yAbsolute += y;
    transformSteps.push(
      createFlareFrame({ stepPercent, x: xAbsolute, y: yAbsolute }),
    );
  }

  return transformSteps.join('\n');
}

function createFlareFrame({ stepPercent, x, y }) {
  return `${stepPercent}%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(${x} * var(--flare-step-size, 10px)), calc(${y} * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }`;
}
