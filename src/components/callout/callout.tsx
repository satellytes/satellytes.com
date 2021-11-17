import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Illustration } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';

interface CalloutProps {
  illustration?: IllustrationType | null;
  children: ReactNode | ReactNode[];
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
  padding-right: 0.5em;

  ${up('sm')} {
    padding-right: 0;
    padding-left: 0.5em;
    flex: 0 0 72px;
    order: 1;
  }
`;

/**
 * Callouts are useful for highlighting specific text or breaking it out from the rest of a document.
 * This allows to easily provide related information to an authored text. Besides the text you can provide
 * an illustration to make it stand out more. The illustration is placed near the text.
 */
const Callout = (props: CalloutProps) => {
  return (
    <CalloutLayout>
      {props.illustration && (
        <CallOutIcon>
          <Illustration show={props.illustration} />
        </CallOutIcon>
      )}
      <CallOutText>{props.children}</CallOutText>
    </CalloutLayout>
  );
};

export default Callout;
