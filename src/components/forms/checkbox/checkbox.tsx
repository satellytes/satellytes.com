import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { theme } from '../../layout/theme';
import { TextStyles } from '../../typography';
import { Icon } from '../../ui/icon/icon';
import { StyledErrorMessage } from '../text-input/text-input';

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const CheckboxLabelText = styled.span`
  ${TextStyles.textR}

  color: #202840;
  margin-left: 12px;
`;

const StyledCheckbox = styled.div<{ checked: boolean; hasError: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;

  background: #f7f8fa;
  border-radius: 4px;

  ${({ hasError }) =>
    hasError &&
    css`
      border: 2px solid ${theme.palette.text.errorMessage};
    `}

  &:hover {
    border: 1px solid ${theme.palette.text.default};
  }

  svg {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  visibility: hidden;
`;

export const Checkbox = (
  props: UseControllerProps<any> & { label: string | JSX.Element },
) => {
  const { field, fieldState, formState } = useController(props);
  const errorMessage = fieldState?.error?.message;
  const [checked, setChecked] = useState(field?.value || false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    field.onChange(newChecked);
  };

  return (
    <div>
      <CheckboxLabel>
        <HiddenCheckbox
          aria-required={true}
          disabled={formState.isSubmitting}
          {...field}
          value={field?.value || false}
          {...props}
          id={props.name}
          onChange={handleChange}
        />
        <StyledCheckbox checked={checked} hasError={Boolean(fieldState?.error)}>
          <Icon show="checkmark_bold" />
        </StyledCheckbox>
        {props.label && (
          <CheckboxLabelText>
            {props.label}{' '}
            {props?.rules?.required && <span aria-hidden={true}>*</span>}
          </CheckboxLabelText>
        )}
      </CheckboxLabel>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </div>
  );
};
