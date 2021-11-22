import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const textXS = css`
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.01em;
`;

const textR = css`
  font-size: 16px;
  line-height: 150%;
`;

const StyledLabel = styled.span`
  ${textXS}
  display: block;
  margin-bottom: 4px;

  color: #202840;
`;

const StyledErrorMessage = styled.span`
  ${textXS}
  display: block;
  margin-top: 4px;

  font-weight: 700;
  color: #ff0d35;
`;

interface TextfieldProps {
  errorMessage: string;
  label: string;
}

const Textfield = ({ label, errorMessage }: TextfieldProps) => {
  const StyledInputText = styled.input.attrs({
    type: 'input',
  })`
    width: 320px;
    height: 48px;

    padding-left: 16px;
    padding-right: 16px;

    ${textR}
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
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </label>
  );
};

export default Textfield;
