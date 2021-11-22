import React from 'react';
import styled from 'styled-components';
import TextStyles from '../typography/typography-v2';

const StyledLabel = styled.span`
  ${TextStyles.textXS}
  display: block;
  margin-bottom: 4px;

  color: #202840;
`;

const StyledErrorMessage = styled.span`
  ${TextStyles.textXS}
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

    ${TextStyles.textR}
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
