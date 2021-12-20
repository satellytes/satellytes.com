import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
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
   * `name` is the id of the text area
   */
  name: string;
  /**
   * A label which is displayed above the text area
   */
  label?: string;
  /**
   * The error message is displayed below the text area and changes the style of the textarea
   */
  errorMessage?: string;
  /**
   * Marks the textarea as a required field of the form
   */
  required?: boolean;
}

export const TextArea = ({
  label,
  name,
  errorMessage,
  inputRef,
  required,
}: TextAreaProps) => {
  return (
    <>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span aria-hidden={true}>*</span>}
        </Label>
      )}
      <StyledTextArea
        {...inputRef}
        hasError={errorMessage}
        id={name}
        aria-required={required}
      />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </>
  );
};
