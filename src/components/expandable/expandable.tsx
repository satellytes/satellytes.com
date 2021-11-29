import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import ChevronSVG from './expandable-chevron.svg';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography/typography-v2';

interface ExpandableProps {
  /**
   * Headline of the Expandable
   * */
  label: string;
  /**
   * The actual text is passed as a child into the component
   * */
  children: ReactNode | ReactNode[];
}

interface ExpandableChevronProps {
  open: boolean;
  className?: string;
}

const ExpandableContainer = styled.div`
  padding: 0 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.palette.text.topline};

  &:hover {
    color: ${theme.palette.text.default};
  }
`;

const Label = styled.p`
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

export const Expandable = ({ label, children }: ExpandableProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ExpandableContainer>
      <LabelContainer onClick={() => setOpen(!open)}>
        <ExpandableChevronStyled open={open} />
        <Label>{label}</Label>
      </LabelContainer>
      {open && <ExpandableText>{children}</ExpandableText>}
    </ExpandableContainer>
  );
};
