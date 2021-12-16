import React, { useState } from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { Icon } from '../../icon/icon';

export const Checkbox = (props) => {
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
    ${TextStyles.textR}

    color: #202840;
    margin-left: 12px;
  `;

  return (
    <CheckboxLabel>
      <HiddenCheckbox />
      <StyledCheckbox>
        <Icon show="checkmark_bold" />
      </StyledCheckbox>
      {props.label && <CheckboxLabelText>{props.label}</CheckboxLabelText>}
    </CheckboxLabel>
  );
};
