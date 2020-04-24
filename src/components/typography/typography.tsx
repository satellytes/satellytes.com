import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export const PageTitle = styled.h1`
  font-size: 32px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 48px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;
