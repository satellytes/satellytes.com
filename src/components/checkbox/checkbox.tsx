import React, { useState } from 'react';
import styled from 'styled-components';

const Checkbox = (props) => {
  const [BoxChecked, setBoxChecked] = useState(true);
  const handleCheckboxChange = (event) => {
    // alert(event.target.checked);
    setBoxChecked(event.target.checked);
  };

  const HiddenCheckbox = styled.input.attrs({
    type: 'checkbox',
    onInput: handleCheckboxChange,
  })`
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
  `;

  const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
  `;

  const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;

    ${Icon} {
      visibility: ${() => (BoxChecked ? 'visible' : 'hidden')};
    }
  `;

  const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
  `;

  return (
    <label>
      <CheckboxContainer>
        <HiddenCheckbox />
        <StyledCheckbox>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <span>{props.label}</span>
      <span>{BoxChecked}</span>
    </label>
  );
};

export default Checkbox;
