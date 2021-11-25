import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { ExpandableChevron } from '../icons/expandable-chevron';

interface ExpandableProps {
  label: string;
  children: ReactNode | ReactNode[];
}

const ExpandableContainer = styled.div`
  padding: 0 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ExpandableChevronStyled = styled(ExpandableChevron)<{ open: boolean }>`
  transition: transform 0.1s ease-out;
  transform: rotate(0deg);
  ${(props) =>
    props.open &&
    css`
      transform: rotate(180deg);
    `}
`;

const Label = styled.p`
  margin-left: 8px;
`;

const ExpandableText = styled.div<{ open: boolean }>`
  ${(props) => !props.open && 'display: none'};
  margin-left: 38px;
`;

export const Expandable = ({ label, children }: ExpandableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ExpandableContainer>
      <LabelContainer onClick={() => setOpen(!open)}>
        <ExpandableChevronStyled open={open} />
        <Label>{label}</Label>
      </LabelContainer>
      <ExpandableText open={open}>{children}</ExpandableText>
    </ExpandableContainer>
  );
};
