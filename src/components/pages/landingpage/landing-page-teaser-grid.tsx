import styled from 'styled-components';
import { up } from '../../support/breakpoint';

export const LandingPageTeaserGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-auto-flow: column;
  grid-auto-columns: 242px;
  overflow-x: auto;
  margin: 0 -24px 48px;
  padding: 0 24px;

  ${up('md')} {
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(242px, 1fr));
    gap: 72px;
    margin: 0;
    margin-bottom: 60px;
    padding: 0;
    overflow-x: hidden;
  }
`;
