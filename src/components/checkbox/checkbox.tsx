import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../typography/typography';

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
    visibility: hidden;
  `;

  const Icon = styled.svg`
    display: inline-block;
    fill: none;
    margin-top: 5px;
    margin-left: 5px;
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
    display: flex;
    align-items: center;
  `;

  const HiddenCheckboxLabel = styled.label`
    display: inline-block;
  `;

  const LabelText = styled(Text)`
    letter-spacing: -0.01em;
    color: #202840;
    margin-left: 12px;
  `;

  return (
    <CheckboxContainer>
      <HiddenCheckboxLabel>
        <HiddenCheckbox />
        <StyledCheckbox>
          <Icon
            width="26"
            height="26"
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
      </HiddenCheckboxLabel>
      <LabelText>{props.label}</LabelText>
    </CheckboxContainer>
  );
};

export default Checkbox;
