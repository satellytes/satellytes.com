import styled, { CSSProp } from 'styled-components';
import { theme } from '../layout/theme';
import { Breakpoints } from '../../@types/styled-components';

const GRID_GAP_DESKTOP: CSSProp = '24px';
const GRID_GAP_MOBILE: CSSProp = '12px';

const breakpoint = (breakpoint: keyof Breakpoints): string => {
  return `
    @media (min-width: ${theme.breakpoints[breakpoint]})
  `;
};

export const Grid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${GRID_GAP_MOBILE}; // outer gap

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: ${GRID_GAP_MOBILE};
  justify-items: stretch;
  align-items: start;

  ${breakpoint('sm')} {
    padding: 0 ${GRID_GAP_DESKTOP};
    grid-column-gap: ${GRID_GAP_DESKTOP};
  }
`;

export const GridItem = styled.div<{ size: number }>`
  grid-column-start: span ${(props) => props.size};
`;
