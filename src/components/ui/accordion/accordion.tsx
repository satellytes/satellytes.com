import React from 'react';

import * as ReachAccordion from '@reach/accordion';
import '@reach/accordion/styles.css';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Illustration } from '../illustration/illustration';
import { AccordionAnimatedPanel } from './accordion-animated-panel';
import { IllustrationType } from '../illustration/illustration-set';
import { AccordionHeader } from './accordion-header';

export interface AccordionProps {
  /**
   * `AccordionSection` components are the only valid type for children
   */
  children: React.ReactNode;
  /**
   * Specify the panel's index or indices to open once the component is initially rendered.
   * **Later updates will be ignored.**
   */
  defaultIndex?: number | number[];
}

export interface AccordionSectionProps {
  /**
   * Typically a text string that serves as a label for the accordion section.
   */
  title: string;
  /**
   * Inner collapsible content for the accordion item..
   */
  children: React.ReactNode;
  /**
   * (Optional) Pass in a valid illustration keyword to show the according illustration.
   */
  illustration?: IllustrationType;
}

const AccordionItem = styled(ReachAccordion.AccordionItem)`
  padding: 20px 0;
  border-top: 1px solid #eeeeee;

  &:last-of-type {
    border-bottom: 1px solid #eeeeee;
  }
`;

const PanelContainer = styled.div`
  ${up('sm')} {
    display: flex;
  }
`;

const PanelIllustration = styled(Illustration)`
  margin-top: 16px;
  margin-bottom: 4px;
  box-sizing: content-box;

  ${up('sm')} {
    margin-left: auto;
    padding-left: 36px;
    margin-top: 12px;
    margin-bottom: 0;

    /**
    Prevent the illustration from changing it's size due to shrinking and growing being a flex child here
    **/
    flex: 0 0 auto;
    order: 1;
  }
`;

export const AccordionSection = (props: AccordionSectionProps) => {
  return (
    <AccordionItem>
      <AccordionHeader>{props.title}</AccordionHeader>
      <AccordionAnimatedPanel>
        <PanelContainer>
          {props.illustration && (
            <PanelIllustration show={props.illustration} />
          )}
          <div>{props.children}</div>
        </PanelContainer>
      </AccordionAnimatedPanel>
    </AccordionItem>
  );
};

export const Accordion = (props: AccordionProps) => {
  return (
    <ReachAccordion.Accordion
      collapsible
      multiple
      defaultIndex={props.defaultIndex}
    >
      {props.children}
    </ReachAccordion.Accordion>
  );
};
