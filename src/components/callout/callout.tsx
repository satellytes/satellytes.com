import React from 'react';
import styled from 'styled-components';

import { up } from '../breakpoint/breakpoint';
interface CalloutProps {
  icon?: React.ReactNode;
  text: string;
}

const CalloutLayout = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding: 16px 20px;
  color: #3e61ee;
  border: 2px solid currentColor;
  box-sizing: border-box;

  ${up('sm')} {
    display: flex;
    align-items: center;
  }
`;

const CallOutText = styled.div`
  ${up('sm')} {
    flex: 1 1 auto;
  }
`;
const CallOutIcon = styled.div`
  float: left;
  width: 48px;
  height: 48px;
  padding-right: 0.5em;

  ${up('sm')} {
    padding-right: 0;
    padding-left: 0.5em;
    width: 72px;
    height: 72px;
    flex: 0 0 72px;
    order: 1;
  }
`;

/**
 - Use an avatar for attributing actions or content to specific users.
 - The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
 **/
const Callout = (props: CalloutProps) => {
  return (
    <CalloutLayout>
      {props.icon && <CallOutIcon>{props.icon}</CallOutIcon>}
      <CallOutText>{props.text}</CallOutText>
    </CalloutLayout>
  );
};

export default Callout;
