import styled from 'styled-components';
import { up } from '../../support/breakpoint';

export const CareerTeaserGrid = styled.div<{ amountOfChildren: number }>`
  display: grid;
  gap: 72px;
  grid-template-columns: ${(props) =>
    `repeat(${props.amountOfChildren}, 242px)`};
  overflow-x: auto;
  margin: 0 -24px;
  padding: 0 24px;

  ${up('md')} {
    grid-template-columns: repeat(auto-fit, minmax(242px, 1fr));
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;
