import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: 0 24px;

  ${up('md')} {
    max-width: 816px;
  }
`;
