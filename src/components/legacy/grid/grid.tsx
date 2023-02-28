import styled, { css, CSSProp } from 'styled-components';
import { up } from '../../support/breakpoint';

type GridItemSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const GRID_GAP_DESKTOP: CSSProp = '24px';
export const GRID_GAP_MOBILE: CSSProp = '16px';

interface GridProps {
  disableGap?: boolean;
  center?: boolean;
  nested?: boolean;
}

/**
 * This container provides a grid that has 12 columns.
 *
 * Grids can also be nested, as well as their gap can be disabled via prop.
 */
export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  grid-column-gap: ${(props) => (props.disableGap ? 0 : GRID_GAP_MOBILE)};
  padding: 0
    ${(props) => (props.disableGap || props.nested ? 0 : GRID_GAP_MOBILE)}; // outer gap

  // max-width: ${(props) => props.theme.maxWidth};

  ${(props) =>
    props.center &&
    css`
      margin: 0 auto;
    `};
  justify-items: stretch;
  align-items: start;

  ${up('md')} {
    grid-column-gap: ${(props) => (props.disableGap ? 0 : GRID_GAP_DESKTOP)};
    padding: 0
      ${(props) => (props.disableGap || props.nested ? 0 : GRID_GAP_DESKTOP)}; // outer gap
  }
`;

interface GridItemProps {
  xs?: GridItemSize;
  sm?: GridItemSize;
  md?: GridItemSize;
  lg?: GridItemSize;
  xl?: GridItemSize;

  /**
   * remove outer gap from item.
   * up(md) only!
   */
  noGap?: boolean;
}

/**
 * The grid item can be placed inside the Grid component. If the amount of items in one row is larger then 12, the
 * overflowing grid item will be placed in the next row.
 */
export const GridItem = styled.div<GridItemProps>`
  /* on mobile an item takes the whole row itself by default */
  grid-column-start: span ${(props) => props.xs || 12};

  // ensure that our columns never grow past the limits
  max-width: 100%;

  ${(props) =>
    props.noGap &&
    css`
      ${up('md')} {
        margin-left: -${GRID_GAP_DESKTOP};
        margin-right: -${GRID_GAP_DESKTOP};
      }
    `}

  ${(props) =>
    props.sm &&
    `
    ${up('sm')} {
      grid-column-start: span ${props.sm};
    }
  `};

  ${(props) =>
    props.md &&
    `
    ${up('md')} {
      grid-column-start: span ${props.md};
    }
  `};

  ${(props) =>
    props.lg &&
    `
    ${up('lg')} {
      grid-column-start: span ${props.lg};
    }
  `};

  ${(props) =>
    props.xl &&
    `
    ${up('xl')} {
      grid-column-start: span ${props.xl}
    }
  `};
`;
