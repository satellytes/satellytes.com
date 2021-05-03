import { keyframes } from 'styled-components';
/**
 * The `FRAMES` content has been created manually by running `transformMapToCssKeyframes` on the set of relative movement (0,1 etc) from the `animation-tool.ts` file.
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
 */
const FRAMES = `

0%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(1 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
3%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(2 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
5%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(3 * var(--flare-step-size, 10px)), calc(-2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
7%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
10%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(0 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
12%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(1 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
14%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
17%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(5 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
19%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(5 * var(--flare-step-size, 10px)), calc(3 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
21%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(5 * var(--flare-step-size, 10px)), calc(4 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
24%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
26%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
28%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(4 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
31%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(3 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
33%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(2 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
35%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(1 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
38%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(0 * var(--flare-step-size, 10px)), calc(7 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
40%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(0 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
42%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-1 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
45%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-2 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
47%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-3 * var(--flare-step-size, 10px)), calc(6 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
49%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-3 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
52%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-4 * var(--flare-step-size, 10px)), calc(5 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
54%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-4 * var(--flare-step-size, 10px)), calc(4 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
56%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-4 * var(--flare-step-size, 10px)), calc(3 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
59%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-4 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
61%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-5 * var(--flare-step-size, 10px)), calc(2 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
63%   {
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
68%   {
            transform:
              rotate(calc(var(--flare-rotate, 0deg)))
              translate(calc(-6 * var(--flare-step-size, 10px)), calc(-1 * var(--flare-step-size, 10px)))
              translate(var(--flare-x, 0), var(--flare-y, 0))
              translate(-50%, -50%);
        }
70%   {
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
77%   {
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
84%   {
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

`;
export const WanderAnimation = keyframes`${FRAMES}`;
