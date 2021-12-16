import styled, { css } from 'styled-components';
import { up } from '../../components/support/breakpoint';

/**
 * I had some weird undefined exports after refactoring.
 * Only a dedicated export from this file fixed it. Good for now.
 */
export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 19px 16px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: rgba(122, 143, 204, 0.2);

  &:hover {
    background: rgba(122, 143, 204, 0.5);
  }

  &:not(:last-of-type) {
    margin-right: 0;

    ${up('md')} {
      margin-right: 24px;
      margin-bottom: 0;
    }
  }

  ${({ hasError }) =>
    hasError &&
    css`
      background: #f8cdd5;
      color: #dc052d;
    `}
`;
