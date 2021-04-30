import { keyframes } from 'styled-components';

export const WanderAnimation = keyframes`
      0%   {
        transform: translate(0px, 0px) rotate(calc(var(--flare-rotate, 0deg)))
        translate(var(--flare-x, 0), var(--flare-y, 0))
        translate(-50%, -50%);
      }
      3%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(1 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      5%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(2 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      7%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(3 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      10%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      12%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(0 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      14%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      16%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      19%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(5 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      21%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(5 * var(--flare-step-size, 10px)), calc(3 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      23%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(5 * var(--flare-step-size, 10px)), calc(4 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      25%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      28%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      30%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(4 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      32%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(3 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      35%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(2 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      37%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(1 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      39%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      41%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      44%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-1 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      46%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-2 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      48%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-3 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      50%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-3 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      53%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-4 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      55%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-4 * var(--flare-step-size, 10px)), calc(4 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      57%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-4 * var(--flare-step-size, 10px)), calc(3 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      60%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-4 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      62%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-5 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      64%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-6 * var(--flare-step-size, 10px)), calc(1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      66%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-6 * var(--flare-step-size, 10px)), calc(0 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      69%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-6 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      71%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-6 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      73%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-5 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      75%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-4 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      78%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-3 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      80%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-2 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      82%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(-1 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      85%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(-3 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      87%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(1 * var(--flare-step-size, 10px)), calc(-4 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      89%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(2 * var(--flare-step-size, 10px)), calc(-5 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      91%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(1 * var(--flare-step-size, 10px)), calc(-4 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      94%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(-3 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      96%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      98%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
      100%   {
        transform:
                rotate(calc(var(--flare-rotate, 0deg)))
                translate(calc(0 * var(--flare-step-size, 10px)), calc(0 * var(--flare-step-size, 10px)))
                translate(var(--flare-x, 0), var(--flare-y, 0))
                translate(-50%, -50%);
      }
    }`;
