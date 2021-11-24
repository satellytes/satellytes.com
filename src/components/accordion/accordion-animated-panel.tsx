import { animated, config, useSpring } from 'react-spring';
import * as ReachAccordion from '@reach/accordion';
import styled from 'styled-components';
import { useAccordionItemContext } from '@reach/accordion';
import { useDivHeight } from './use-div-height';
import React from 'react';

const AnimatedAccordionPanel = animated(ReachAccordion.AccordionPanel);
const AnimatedPanelContainer = styled.div`
  padding-bottom: 16px;
`;
/**
 * Animated version of the AccordionPanel.
 * Uses a custom hook `useDivHeight` to measure the height and then
 * animated the height with `useSpring`.
 *
 * Based on forwardRef to forward the `ref` from the inner component `AnimatedAccordionPanel`
 * to hide this animation layer implementation.
 *
 * Read this if forwardRef is unclear:
 * https://reactjs.org/docs/forwarding-refs.html
 */
export const AccordionAnimatedPanel = ({ children }) => {
  const { isExpanded } = useAccordionItemContext();
  const { ref, height } = useDivHeight();

  /**
   * Check the basics of useSpring
   * https://react-spring.io/basics
   */
  const props = useSpring({
    height: isExpanded ? height : 0,
    overflow: 'hidden',
    config: {
      ...config.default,
    },
  });

  return (
    <AnimatedAccordionPanel style={props} hidden={false}>
      <AnimatedPanelContainer ref={ref}>{children}</AnimatedPanelContainer>
    </AnimatedAccordionPanel>
  );
};
