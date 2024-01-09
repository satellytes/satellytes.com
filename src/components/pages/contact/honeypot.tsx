import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormData } from './form';

const HoneypotFieldContainer = styled.div`
  ${hideVisually()}
  aria-hidden: true;
`;

export const HoneypotField = (
  props: UseControllerProps<FormData> & { label: string },
) => {
  const { field } = useController(props);
  return (
    <HoneypotFieldContainer>
      <label aria-hidden={true}>
        {props.label}
        <input
          id={props.name}
          type="text"
          {...field}
          tabIndex={-1}
          autoComplete="false"
          aria-hidden={true}
        />
      </label>
    </HoneypotFieldContainer>
  );
};
