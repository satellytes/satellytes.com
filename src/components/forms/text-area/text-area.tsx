import React from 'react';
import styled, { css } from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { useController, UseControllerProps } from 'react-hook-form';
import { StyledErrorMessage, Label } from '../text-input/text-input';
import { FormDataProps } from '../../pages/career-details/new-career-form/career-form';

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  height: 160px;
  width: 100%;
  padding: 19px 16px;
  resize: vertical;

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

export const TextArea = (
  props: UseControllerProps<FormDataProps> & { label: string },
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
      <StyledTextArea
        aria-required={true}
        hasError={Boolean(errorMessage)}
        disabled={formState.isSubmitting}
        {...field}
        value={(field?.value as string) || ''}
        name={props.name}
        id={props.name}
      />

      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </div>
  );
};
