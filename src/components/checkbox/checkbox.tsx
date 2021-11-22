import React, { useState } from 'react';
import styled from 'styled-components';
import { textR } from '../typography/typography-v2';

const Checkbox = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    const newChecked = !checked;
    props.onChange?.(newChecked);
    setChecked(newChecked);
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

  const CheckboxLabelText = styled.span`
    ${textR}

    color: #202840;
    margin-left: 12px;
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
      {props.label && <CheckboxLabelText>{props.label}</CheckboxLabelText>}
    </CheckboxLabel>
  );
};

export default Checkbox;
