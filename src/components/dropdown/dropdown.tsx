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
  /**
   * Initial value of the dropdown
   * */
  defaultValue?: string;
  /**
   * Returns the value of the selected option on change
   * */
  onChange?: (selectedOption: string) => any;
  /**
   * Current active value
   * */
  value?: string;
  /**
   * An icon which is shown next to the dropdown
   * */
  arrow?: React.ReactNode;
  /**
   * The DropdownOptions are passed as children
   * */
  children: React.ReactNode | React.ReactNode[];
}

export const Dropdown = ({
  defaultValue,
  value,
  children,
  onChange,
  arrow,
  ...props
}: DropdownProps) => {
  return (
    <StyledListboxInput
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    >
      <StyledListboxButton arrow={arrow} {...props} />
      <StyledListboxPopover>
        <ListboxList>{children}</ListboxList>
      </StyledListboxPopover>
    </StyledListboxInput>
  );
};

interface DropdownOptionProps {
  /**
   * Value which is returned when `onChange()` of the parent is called
   * */
  value: string;
  /**
   * The label which is shown in the expanded dropdown. If no `popoverLabel` is given, the same value as in `children` is displayed
   * */
  popoverLabel?: string;

  disabled?: boolean;
  /**
   * Element which is shown in the collapsed state. If no `popoverLabel` is given, it will also be displayed in the expanded state.
   * */
  children: React.ReactNode | React.ReactNode[];
}

export const DropdownOption = ({
  value,
  children,
  popoverLabel,
  ...props
}: DropdownOptionProps) => {
  return (
    <ListboxOption value={value} label={popoverLabel} {...props}>
      {children}
    </ListboxOption>
  );
};
