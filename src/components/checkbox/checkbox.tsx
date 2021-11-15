import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckboxLabelText } from '../typography/typography';

const Checkbox = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
    props.onChange?.(checked);
  };

  const HiddenCheckbox = styled.input.attrs({
    type: 'checkbox',
    onChange: handleChange,
  })`
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    visibility: hidden;
  `;

  const StyledCheckbox = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;

    background: #f7f8fa;
    border-radius: 4px;

    svg {
      visibility: ${checked ? 'visible' : 'hidden'};
    }
  `;

  const CheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
  `;

  return (
    <CheckboxLabel>
      <HiddenCheckbox />
      <StyledCheckbox>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.2002 13.6L10.154 16.7999L16.8002 7.19995"
            stroke="#202840"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </StyledCheckbox>
      <CheckboxLabelText>{props.label}</CheckboxLabelText>
    </CheckboxLabel>
  );
};

export default Checkbox;
