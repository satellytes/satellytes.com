import styled from 'styled-components';
import { up } from '../support/breakpoint';
import { TextStyles } from '../typography';

export const SubTitle = styled.h3`
  font-size: 36px;
  line-height: 110%;
  margin: 0;
`;

export const TextTitle = styled.h4`
  font-size: 28px;
  line-height: 110%;
  margin: 0;
`;

export const SmallTitle = styled.h5`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 110%;
  margin: 0;
`;

/**
 *
 * Text
 *
 */
export const Text = styled.div`
  ${TextStyles.textSR}
  ${up('md')} {
    ${TextStyles.textR}
  }

  margin-top: 0;
  margin-bottom: 16px;

  white-space: pre-wrap;
`;
