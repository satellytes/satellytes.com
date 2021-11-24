import React from 'react';

import * as ReachAccordion from '@reach/accordion';
import '@reach/accordion/styles.css';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
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
   * A default value for the open panel's index or indices in an uncontrolled accordion component when it is initially rendered
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
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;

  & + & {
    margin-top: 34px;
  }
`;

const PanelContainer = styled.div`
  ${up('sm')} {
    display: flex;
  }
`;

const PanelIllustration = styled(Illustration)`
  shape-outside: circle();
  padding-right: 1em;
  float: left;

  ${up('sm')} {
    margin-left: auto;
    padding-right: 0;
    padding-left: 36px;
    /**
    prevent the illustration from changing it's size 
    being a flex child due to shriking and growing
    **/
    flex: 0 0 auto;
    order: 1;
  }
`;

const AccordionStyled = styled(ReachAccordion.Accordion)`
  padding-left: 24px;
  padding-right: 24px;
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
    <AccordionStyled
      multiple
      collapsible
      defaultIndex={props.defaultIndex || 0}
    >
      {props.children}
    </AccordionStyled>
  );
};
