import React from 'react';
import styled from 'styled-components';
import { GRID_GAP_DESKTOP, GRID_GAP_MOBILE } from '../../grid/grid';
import { up } from '../../../new-components/support/breakpoint';

interface BurgerMenuProps {
  transition: boolean;
  setHoverTransition: () => void;
}
export const BurgerMenu = ({
  transition,
  setHoverTransition,
}: BurgerMenuProps) => {
  return (
    <Wrapper transition={transition} onMouseLeave={() => setHoverTransition()}>
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ transition: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 3px 0px;

  margin-right: -${() => GRID_GAP_MOBILE};
  padding-right: ${() => GRID_GAP_MOBILE};

  ${up('md')} {
    margin-right: -${() => GRID_GAP_DESKTOP};
    padding-right: ${() => GRID_GAP_DESKTOP};
  }

  .bar {
    height: 2px;
    margin-bottom: 2px;
    background-color: white;
    border-radius: 2px;
  }

  .bar:nth-child(1) {
    width: 12px;
  }

  .bar:nth-child(2) {
    width: 10px;
  }

  .bar:nth-child(3) {
    width: 8px;
    margin-bottom: 0px;
  }

  @media (pointer: fine) {
    .bar:nth-child(1) {
      transition: all 0.1s 0.2s;
    }

    .bar:nth-child(2) {
      transition: all 0.1s 0.1s;
    }

    .bar:nth-child(3) {
      transition: all 0.1s;
    }

    &:hover {
      .bar:nth-child(1) {
        ${({ transition }) =>
          transition ? `transition: all 0.1s;` : `transition: none;`}
        width: 18px;
      }
      .bar:nth-child(2) {
        ${({ transition }) =>
          transition ? `transition: all 0.1s 0.1s;` : `transition: none;`}
        width: 14px;
      }
      .bar:nth-child(3) {
        ${({ transition }) =>
          transition ? `transition: all 0.1s 0.2s;` : `transition: none;`}
        width: 10px;
      }
    }
  }
`;
