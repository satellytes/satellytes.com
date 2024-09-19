import React from 'react';
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

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})<{ $hasError: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  background: #f7f8fa;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  ${({ $hasError }) =>
    $hasError &&
    css`
      border: 2px solid ${theme.palette.text.errorMessage};
    `}

  &:hover {
    border: 1px solid ${theme.palette.text.default};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  pointer-events: none;
`;

const CheckboxLabelTextWrapper = ({ label, required, id }) => {
  return (
    <CheckboxLabelText id={id}>
      {label} {required && <span aria-hidden={true}>*</span>}
    </CheckboxLabelText>
  );
};

export const Checkbox = (
  props: UseControllerProps<any> & { label: string | JSX.Element },
) => {
  const { field, fieldState, formState } = useController(props);
  const errorMessage = fieldState?.error?.message;

  return (
    <div style={{ position: 'relative' }}>
      <CheckboxLabel>
        <StyledCheckbox
          aria-required={Boolean(props.rules?.required)}
          aria-describedby={errorMessage && `${props.name}-error`}
          aria-labelledby={props.label && `${props.name}-label`}
          aria-invalid={Boolean(errorMessage)}
          disabled={formState.isSubmitting}
          {...field}
          id={props.name}
          $hasError={Boolean(fieldState?.error)}
        />
        {field.value && <StyledIcon show="checkmark_bold" />}
        {props.label && (
          <CheckboxLabelTextWrapper
            id={`${props.name}-label`}
            label={props.label}
            required={props.rules?.required}
          />
        )}
      </CheckboxLabel>
      {errorMessage && (
        <StyledErrorMessage id={`${props.name}-error`}>
          {errorMessage}
        </StyledErrorMessage>
      )}
    </div>
  );
};
