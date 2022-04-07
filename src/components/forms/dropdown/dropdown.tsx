import React from 'react';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
  ListboxOptionProps,
  ListboxProps,
} from '@reach/listbox';
import '@reach/listbox/styles.css';
import styled from 'styled-components';

const StyledListboxPopover = styled(ListboxPopover)`
  z-index: 200;
  padding: 0;
`;

const StyledListboxButton = styled(ListboxButton)`
  border: none;

  [data-expanded] {
    transform: rotate(180deg);
  }
`;

export const Dropdown = ({
  defaultValue,
  value,
  children,
  onChange,
  arrow,
  ...props
}: ListboxProps) => {
  return (
    <ListboxInput defaultValue={defaultValue} value={value} onChange={onChange}>
      <StyledListboxButton arrow={arrow} {...props} />
      <StyledListboxPopover>
        <ListboxList>{children}</ListboxList>
      </StyledListboxPopover>
    </ListboxInput>
  );
};

interface DropdownOptionProps extends ListboxOptionProps {
  /**
   * Element which is shown in the collapsed state. If no `label` is given, it will also be displayed in the expanded state.
   * */
  children: React.ReactNode | React.ReactNode[];
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
