import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';
import { useController, UseControllerProps } from 'react-hook-form';

const HoneypotFieldContainer = styled.div`
  ${hideVisually()}
`;

export const HoneypotField = (
  props: UseControllerProps<any> & { label: string },
) => {
  const { field } = useController(props);
  return (
    <HoneypotFieldContainer>
      <label>
        {props.label}
        <input
          id={props.name}
          type="text"
          {...field}
          tabIndex={-1}
          autoComplete="false"
        />
      </label>
    </HoneypotFieldContainer>
  );
};
