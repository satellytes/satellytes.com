import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ChevronSVG } from './expandable-chevron.svg';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography/typography-v2';

interface ExpandableProps {
  /**
   * Headline of the Expandable
   * */
  summary: string;
  /**
   * The actual text is passed as a child into the component
   * */
  children: ReactNode | ReactNode[];
}

interface ExpandableChevronProps {
  open: boolean;
  className?: string;
}

const ExpandableContainer = styled.details`
  padding: 0 20px;
`;

const SummaryContainer = styled.summary`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.palette.text.topline};
  list-style-type: none;

  &::marker {
    display: none;
  }
  
  &::-webkit-details-marker{
    display: none;
  }

  &:hover {
    color: ${theme.palette.text.default};
  }
`;

const SummaryText = styled.p`
  ${TextStyles.headlineXS}
  margin: 0 0 0 8px;
`;

const AccordionChevron = (props: ExpandableChevronProps) => {
  return (
    <div className={props.className}>
      <ChevronSVG />
    </div>
  );
};

const ExpandableChevronStyled = styled(AccordionChevron)<{ open: boolean }>`
  transition: transform 0.1s ease-out;
  margin-bottom: 1px;

  ${(props) =>
    props.open &&
    css`
      transform: rotate(90deg);
    `}
`;

const ExpandableText = styled.div`
  margin-left: 14px;
  margin-top: 12px;
`;

export const Expandable = ({ summary, children }: ExpandableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpandableContainer>
      <SummaryContainer
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ExpandableChevronStyled open={isOpen} />
        <SummaryText>{summary}</SummaryText>
      </SummaryContainer>
      <ExpandableText>{children}</ExpandableText>
    </ExpandableContainer>
  );
};
