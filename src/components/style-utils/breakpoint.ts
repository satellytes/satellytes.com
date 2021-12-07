import { Breakpoints } from '../../@types/styled-components';
import { theme } from '../layout/theme';

export const up = (breakpoint: keyof Breakpoints): string => `
    @media (min-width: ${theme.breakpoints[breakpoint]})
  `;

export const down = (breakpoint: keyof Breakpoints): string => `
    @media (max-width: ${theme.breakpoints[breakpoint]})
  `;
