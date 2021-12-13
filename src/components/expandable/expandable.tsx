import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography/typography-v2';
import { Icon } from '../../new-components/icon/icon';

interface ExpandableProps {
  className?: string;
  /**
   * Headline of the Expandable
   * */
  summary: string;
  /**
   * The actual text is passed as a child into the component
   * */
  children: ReactNode | ReactNode[];
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

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    color: ${theme.palette.text.default};
  }
`;

const SummaryText = styled.p`
  ${TextStyles.headlineXS}
  margin: 0;
  line-height: 1;
`;

const ExpandableChevronStyled = styled(Icon)<{ open: boolean }>`
  transition: transform 0.1s ease-out;
  ${(props) =>
    props.open &&
    css`
      transform: rotate(90deg);
    `}
`;

const ExpandableText = styled.div`
  margin-left: 24px;
  margin-top: 12px;
`;

export const Expandable = ({
  summary,
  children,
  className,
}: ExpandableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpandableContainer className={className}>
      <SummaryContainer
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ExpandableChevronStyled show={'caret_round_right'} open={isOpen} />
        <SummaryText>{summary}</SummaryText>
      </SummaryContainer>
      <ExpandableText>{children}</ExpandableText>
    </ExpandableContainer>
  );
};
