import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export const PageTitle = styled.h1`
  color: #668cff;
  font-size: 48px;
  line-height: 110%;

  margin-top: 96px;
  margin-bottom: 40px;

  ${up('md')} {
    font-size: 72px;
    margin-top: 192px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 48px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 16px;
`;
