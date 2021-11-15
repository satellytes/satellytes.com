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
 * This callout components helps to include related text outside of the tex flow.
 * That's ideal for a blog post, where you can point out details or related information
 * without breaking your text flow.
 *
 * The callout component is made of a border to separate it from the surrounding content.
 * Within that area you will find the mandatory text content and an optional callout illustration
 * which can be any React component, but it's best one of the available space illustrations.
 */
const Callout = (props: CalloutProps) => {
  return (
    <CalloutLayout>
      {props.icon && <CallOutIcon>{props.icon}</CallOutIcon>}
      <CallOutText>{props.text}</CallOutText>
    </CalloutLayout>
  );
};

export default Callout;
