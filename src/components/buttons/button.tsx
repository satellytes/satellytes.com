import React from 'react';
import styled from 'styled-components';
import { Icon, IconSize } from '../../new-components/icon/icon';
import { resetButton } from '../css-helpers';
import { lighten } from 'polished';
import { TextStyles } from '../typography/typography-v2';

const StyledButton = styled.button`
  ${resetButton};
  ${TextStyles.toplineR}

  line-height: 40px;
  color: #ffffff;
  border-radius: 30px;
  cursor: pointer;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);

  &:hover {
    background: #3e61ee;
  }

  &:active {
    background: ${lighten(0.1, '#3e61ee')};
  }
`;

const StyledIcon = styled(Icon)`
  padding-right: 10px;
  // pull the fixed size icon closer to the text
  margin-left: -4px;
  /**
    This is a magic number to match the vertical middle of the button
    with the icon which has a fixed bounding box which won't allow us to align
    it based on the actual shape of the icon.
   */
  vertical-align: -18%;
`;

const ButtonText = styled.span`
  padding-left: 16px;
  padding-right: 16px;
`;

interface RegularButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}

const Button = ({ children, onClick }: RegularButtonProps) => {
  return (
    <StyledButton onClick={(event) => onClick?.(event)}>
      <ButtonText>{children}</ButtonText>
      <StyledIcon show={'chevron_right'} size={IconSize.NORMAL} />
    </StyledButton>
  );
};

export default Button;
