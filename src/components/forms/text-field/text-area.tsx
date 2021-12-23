import React from 'react';
import styled, { css } from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { useController, UseControllerProps } from 'react-hook-form';
import { StyledErrorMessage, Label } from './text-input';

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  height: 160px;
  width: 100%;
  padding: 19px 16px;
  resize: vertical;

  ${TextStyles.textR}

  background: ${theme.palette.background.leadbox};
  border: 2px solid ${theme.palette.background.leadbox};
  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid ${theme.palette.text.errorMessage};
    `};
`;

export const TextArea = (
  props: UseControllerProps<any> & { label: string },
) => {
  const { field, fieldState } = useController(props);

  return (
    <>
      {props.label && (
        <Label htmlFor={props.name}>
          {props.label}{' '}
          {props?.rules?.required && <span aria-hidden={true}>*</span>}
        </Label>
      )}
      <StyledTextArea
        aria-required={true}
        hasError={Boolean(fieldState?.error?.message)}
        {...field}
        {...props}
        id={props.name}
      />

      {fieldState?.error?.message && (
        <StyledErrorMessage>{fieldState.error.message}</StyledErrorMessage>
      )}
    </>
  );
};
