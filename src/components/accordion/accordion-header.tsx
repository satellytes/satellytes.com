import styled, { css } from 'styled-components';
import { TextStyles } from '../typography/typography-v2';
import { ellipsis } from 'polished';
import * as ReachAccordion from '@reach/accordion';
import { theme } from '../layout/theme';
import { ReactComponent as ChevronSVG } from './chevron.svg';
import { useAccordionItemContext } from '@reach/accordion';
import React from 'react';
import { resetButton } from '../utils';

interface AccordionHeaderProps {
  children: React.ReactNode;
}

interface AccordionChevronProps {
  open: boolean;
  className?: string;
}

const AccordionTitleHeadline = styled.span`
  ${TextStyles.headlineXS}
  ${ellipsis()}
  padding-right: 20px;
  color: inherit;
`;

const AccordionButton = styled(ReachAccordion.AccordionButton)`
  ${resetButton};

  color: ${theme.palette.text.topline};

  &:hover {
    color: ${theme.palette.text.default};
  }

  cursor: pointer;
  width: 100%;

  display: flex;
  align-items: center;
  padding: 24px 20px;
`;

const AccordionChevron = (props: AccordionChevronProps) => {
  return (
    <div className={props.className}>
      <ChevronSVG />
    </div>
  );
};

const AccordionChevronStyled = styled(AccordionChevron)`
  // embed in a flex layout we want to push the chevron to the far right
  margin-left: auto;

  transition: transform 0.1s ease-out;
  transform: rotate(180deg);

  ${(props) =>
    props.open &&
    css`
      transform: rotate(0deg);
    `}
`;

export const AccordionHeader = (props: AccordionHeaderProps) => {
  const { isExpanded } = useAccordionItemContext();

  return (
    <AccordionButton>
      <AccordionTitleHeadline>{props.children}</AccordionTitleHeadline>
      <AccordionChevronStyled open={isExpanded} />
    </AccordionButton>
  );
};
