import React from 'react';

import * as ReachAccordion from '@reach/accordion';
import '@reach/accordion/styles.css';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Illustration } from '../illustration/illustration';
import { AccordionAnimatedPanel } from './accordion-animated-panel';
import { IllustrationType } from '../illustration/illustration-set';
import { AccordionHeader } from './accordion-header';

interface AccordionProps {
  children: React.ReactNode;
  defaultIndex?: number;
}

interface AccordionContentProps {
  title: string;
  children: React.ReactNode;
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

export const AccordionContent = (props: AccordionContentProps) => {
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
    <AccordionStyled multiple collapsible defaultIndex={props.defaultIndex}>
      {props.children}
    </AccordionStyled>
  );
};
