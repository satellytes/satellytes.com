import styled, { css } from 'styled-components';
import { TextStyles } from '../../typography';
import { ellipsis } from 'polished';
import * as ReachAccordion from '@reach/accordion';
import { theme } from '../../layout/theme';
import { useAccordionItemContext } from '@reach/accordion';
import React from 'react';
import { resetButton } from '../../support/css-helpers';
import { Icon } from '../icon/icon';

interface AccordionHeaderProps {
  children: React.ReactNode;
}

interface StyledIconProps {
  open: boolean;
}

const AccordionTitleHeadline = styled.span`
  ${TextStyles.headlineXXS}
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
  padding: 0 24px;
`;

const StyledIcon = styled(Icon)<StyledIconProps>`
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
    <AccordionButton aria-labelledby={props.children}>
      <AccordionTitleHeadline id={props.children}>
        {props.children}
      </AccordionTitleHeadline>
      <StyledIcon open={isExpanded} show="chevron_up" ariaHidden={true} />
    </AccordionButton>
  );
};
