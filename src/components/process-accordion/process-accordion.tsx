import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import styled from 'styled-components';
import { CaptionText } from '../typography/typography';

const ProcessCaption = styled(CaptionText)`
  font-size: 16px;
  margin: 16px;
`;

const StyledAccordion = styled(Accordion)`
  display: relative;
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  padding: 16px;
`;

const StyledAccordionButton = styled(AccordionButton)`
  background: none;
  border: none;
  padding: 0px;

  display: relative;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
`;

const StyledAccordionItem = styled(AccordionItem)`
  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &[data-state='open'] {
    position: relative;
    background: linear-gradient(
      180deg,
      rgba(77, 121, 255, 0.1) 0%,
      rgba(77, 121, 255, 0) 100%
    );
    &::after {
      content: url("data:image/svg+xml;utf8,<svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10 6L6 2L2 6' stroke='%23668CFF' stroke-width='2.5' stroke-linecap='round'/></svg>");
      position: absolute;
      z-index: -1;
      top: 15px;
      right: 24px;
    }
  }

  &[data-state='collapsed'] {
    position: relative;
    &::after {
      content: url("data:image/svg+xml;utf8,<svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10 2L6 6L2 2' stroke='%23668CFF' stroke-width='2.5' stroke-linecap='round'/></svg>");
      position: absolute;
      z-index: -1;
      top: 15px;
      right: 24px;
    }
  }
`;

export const ProcessAccordion = () => {
  return (
    <StyledAccordion collapsible multiple>
      <StyledAccordionItem>
        <StyledAccordionButton>
          <ProcessCaption>1. Bewerbung</ProcessCaption>
        </StyledAccordionButton>
        <StyledAccordionPanel>Hier bewirbst du dich</StyledAccordionPanel>
      </StyledAccordionItem>
      <StyledAccordionItem>
        <StyledAccordionButton>
          <ProcessCaption>2. Kennenlernen</ProcessCaption>
        </StyledAccordionButton>
        <StyledAccordionPanel>Hier lernen wir dich kennen</StyledAccordionPanel>
      </StyledAccordionItem>
      <StyledAccordionItem>
        <StyledAccordionButton>
          <ProcessCaption>3. Tech Expertise</ProcessCaption>
        </StyledAccordionButton>
        <StyledAccordionPanel>
          Hier testen wir deine Tech Expertise
        </StyledAccordionPanel>
      </StyledAccordionItem>
      <StyledAccordionItem>
        <StyledAccordionButton>
          <ProcessCaption>4. Team</ProcessCaption>
        </StyledAccordionButton>
        <StyledAccordionPanel>
          Hier stellen wir dich unserem Team vor
        </StyledAccordionPanel>
      </StyledAccordionItem>
      <StyledAccordionItem>
        <StyledAccordionButton>
          <ProcessCaption>5. Ergebnis</ProcessCaption>
        </StyledAccordionButton>
        <StyledAccordionPanel>
          Hier verkünden wir das Ergebnis
        </StyledAccordionPanel>
      </StyledAccordionItem>
    </StyledAccordion>
  );
};
