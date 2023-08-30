import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { theme } from '../../layout/theme';
import { TextStyles } from '../../typography';
import { Icon } from '../../ui/icon/icon';
import { StyledErrorMessage } from '../text-input/text-input';
import { up } from '../../support/breakpoint';

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const CheckboxLabelText = styled.span`
  ${TextStyles.textSR}

  color: #202840;
  margin-left: 12px;

  ${up('sm')} {
    ${TextStyles.textR}
  }
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

const CheckboxLabelTextWrapper = ({ label, required }) => {
  return (
    <CheckboxLabelText>
      {label} {required && <span aria-hidden={true}>*</span>}
    </CheckboxLabelText>
  );
};

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
          <CheckboxLabelTextWrapper
            label={props.label}
            required={props.rules?.required}
          />
        )}
      </CheckboxLabel>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </div>
  );
};
