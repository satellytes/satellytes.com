import React, { useState } from 'react';
import styled from 'styled-components';

const Checkbox = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
    props.onChange(checked);
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
  `;

  const Icon = styled.svg`
    display: inline-block;
    fill: none;
    padding: 9.6px;
  `;

  const StyledCheckbox = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;

    background: #f7f8fa;
    border-radius: 4px;

    ${Icon} {
      visibility: ${checked ? 'visible' : 'hidden'};
    }
  `;

  const CheckboxContainer = styled.div`
    display: inline-block;
    padding: 24px;
  `;

  const CheckboxLabel = styled.label`
    margin-left: 12px;
  `;

  return (
    <CheckboxContainer>
      <CheckboxLabel>
        <HiddenCheckbox />
        <StyledCheckbox>
          <Icon
            width="12"
            height="12"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.2002 7.59995L4.15404 10.7999L10.8002 1.19995"
              stroke="#202840"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Icon>
        </StyledCheckbox>
        <span>{props.label}</span>
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
