import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { IconType } from '../icon/icon-set';

const StyledButton = styled.button`
  border: none;
  border-radius: 30px;
  cursor: pointer;

  height: 24px;
  width: 24px;

  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);

  color: #ffffff;

  padding: 0;

  &:hover {
    background: #3e61ee;
  }

  &:active {
    background: ${lighten(0.1, '#3e61ee')};
  }
`;

interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  show: IconType;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <StyledButton {...props}>
      <Icon show={props.show}></Icon>
    </StyledButton>
  );
};
