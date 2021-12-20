import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';

const TextArea = styled.textarea<{ hasError?: boolean }>`
  height: 160px;
  width: 100%;
  padding: 19px 16px;
  resize: vertical;

  ${TextStyles.textR}

  background: ${theme.palette.background.leadbox};
  border: 2px solid
    ${(props) =>
      props.hasError
        ? theme.palette.text.errorMessage
        : theme.palette.background.leadbox};
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 320px;
  height: 48px;

  padding-left: 16px;
  padding-right: 16px;

  ${TextStyles.textR}

  background: ${theme.palette.background.leadbox};
  border: 2px solid
    ${(props) =>
      props.hasError
        ? theme.palette.text.errorMessage
        : theme.palette.background.leadbox};
`;

const Label = styled.label`
  ${TextStyles.textXS}
  display: block;
  margin-bottom: 4px;

  color: ${theme.palette.text.default};
`;

const StyledErrorMessage = styled.span`
  ${TextStyles.textXS}
  font-weight: 700;
  display: block;
  margin-top: 4px;

  color: ${theme.palette.text.errorMessage};
`;

export interface TextAreaProps {
  inputRef: any;
  /**
   * `name` is the id of the text input
   */
  name: string;
  /**
   * A label which is displayed above the text input
   */
  label?: string;
  /**
   * Render the TextInput component as HTML `input` or `textarea`
   */
  type?: 'textarea' | 'input';
  /**
   * The error message is displayed below the text area and changes the style of the text input
   */
  errorMessage?: string;
  /**
   * Marks the component as a required field of the form
   */
  required?: boolean;
}

export const TextInput = ({
  label,
  name,
  errorMessage,
  inputRef,
  required,
  type = 'input',
}: TextAreaProps) => {
  return (
    <>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span aria-hidden={true}>*</span>}
        </Label>
      )}
      {type === 'textarea' ? (
        <TextArea
          {...inputRef}
          hasError={errorMessage}
          id={name}
          aria-required={required}
        />
      ) : (
        <Input
          type={'text'}
          {...inputRef}
          hasError={errorMessage}
          id={name}
          aria-required={required}
        />
      )}

      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </>
  );
};
