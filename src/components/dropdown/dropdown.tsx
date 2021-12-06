import React from 'react';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';
import '@reach/listbox/styles.css';
import styled from 'styled-components';

const StyledListboxInput = styled(ListboxInput)`
  cursor: pointer;
`;
const StyledListboxPopover = styled(ListboxPopover)`
  z-index: 200;
  cursor: pointer;
  padding: 0;
`;

const StyledListboxButton = styled(ListboxButton)`
  border: none;
  cursor: pointer;
`;

interface DropdownProps {
  defaultValue?: string;
  onChange?: (selectedOption: string) => any;
  value?: string;
  children: React.ReactNode | React.ReactNode[];
  arrow?: React.ReactNode;
}

export const Dropdown = ({
  defaultValue,
  value,
  children,
  onChange,
  ...props
}: DropdownProps) => {
  return (
    <StyledListboxInput
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    >
      <StyledListboxButton {...props} />
      <StyledListboxPopover>
        <ListboxList>{children}</ListboxList>
      </StyledListboxPopover>
    </StyledListboxInput>
  );
};

interface DropdownOptionProps {
  value: string;
  children: React.ReactNode | React.ReactNode[];
  label?: string;
  disabled?: boolean;
}

export const DropdownOption = ({
  value,
  children,
  label,
  ...props
}: DropdownOptionProps) => {
  return (
    <ListboxOption value={value} label={label} {...props}>
      {children}
    </ListboxOption>
  );
};
