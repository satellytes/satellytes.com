import React from 'react';
import styled from 'styled-components';
import { TextfieldLabel } from './../typography/typography';

const StyledLabel = styled(TextfieldLabel)`
  display: block;
  margin-bottom: 4px;

  &.error {
    font-weight: 700;
    color: #ff0d35;
  }
`;

interface Textfield {
  errorMessage: string;
  label: string;
}

const Textfield = ({ label, errorMessage }) => {
  const StyledInputText = styled.input.attrs({
    type: 'input',
  })`
    width: 320px;
    height: 48px;

    padding-left: 16px;
    padding-right: 16px;

    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.01em;
    color: #202840;

    border: 2px solid;
    border-color: ${errorMessage ? '#FF0D35' : '#f7f8fa'};
    background: #f7f8fa;
  `;

  return (
    <label>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputText />
      {errorMessage && (
        <StyledLabel className="error">{errorMessage}</StyledLabel>
      )}
    </label>
  );
};

export default Textfield;
