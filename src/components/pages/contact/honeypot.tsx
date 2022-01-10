import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

const HoneypotFieldContainer = styled.div`
  ${hideVisually()}
`;

export const HoneypotField = ({ label, control }) => {
  return (
    <HoneypotFieldContainer>
      <label>
        {label}
        <input type="text" {...control} tabIndex={-1} autoComplete="false" />
      </label>
    </HoneypotFieldContainer>
  );
};
