import React from 'react';
import styled, { css } from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { useController, UseControllerProps } from 'react-hook-form';

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 48px;

  padding-left: 16px;
  padding-right: 16px;

  ${TextStyles.textR}

  background: ${theme.palette.background.leadbox};
  border: 2px solid ${theme.palette.background.leadbox};

  &:hover {
    border: 1px solid ${theme.palette.text.default};
  }

  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid ${theme.palette.text.errorMessage};
    `};
`;

export const Label = styled.label`
  ${TextStyles.label}

  display: block;
  margin-bottom: 4px;

  color: ${theme.palette.text.default};
`;

export const StyledErrorMessage = styled.span`
  ${TextStyles.errorMessage}

  display: block;
  margin-top: 4px;

  color: ${theme.palette.text.errorMessage};
`;

export const TextInput = (
  props: UseControllerProps<any> & { label: string },
) => {
  const { field, fieldState, formState } = useController(props);
  const errorMessage = fieldState?.error?.message;

  return (
    <div>
      {props.label && (
        <Label htmlFor={props.name}>
          {props.label}{' '}
          {props?.rules?.required && <span aria-hidden={true}>*</span>}
        </Label>
      )}
      <Input
        type={'text'}
        aria-required={true}
        hasError={Boolean(errorMessage)}
        disabled={formState.isSubmitting}
        id={props.name}
        {...field}
        value={field?.value || ''}
        {...props}
      />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </div>
  );
};
