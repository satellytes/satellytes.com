import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';

export const Label = styled.label`
  ${TextStyles.textXS}
  display: block;
  margin-bottom: 4px;

  color: ${theme.palette.text.default};
`;

export const StyledErrorMessage = styled.span`
  ${TextStyles.textXS}
  font-weight: 700;
  display: block;
  margin-top: 4px;

  color: ${theme.palette.text.errorMessage};
`;

interface TextInputProps {
  errorMessage: string;
  label: string;
}

export const TextInput = ({ label, errorMessage }: TextInputProps) => {
  const StyledInputText = styled.input.attrs({
    type: 'input',
  })`
    width: 320px;
    height: 48px;

    padding-left: 16px;
    padding-right: 16px;

    ${TextStyles.textR}
    letter-spacing: -0.01em;
    color: #202840;

    border: 2px solid;
    border-color: ${errorMessage ? '#FF0D35' : '#f7f8fa'};
    background: #f7f8fa;
  `;

  return (
    <label>
      <Label>{label}</Label>
      <StyledInputText />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </label>
  );
};
