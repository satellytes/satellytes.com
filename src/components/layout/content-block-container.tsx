import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export const ContentBlockContainer = styled.div`
  margin-top: 80px;

  ${up('md')} {
    margin-top: 180px;
  }
`;
