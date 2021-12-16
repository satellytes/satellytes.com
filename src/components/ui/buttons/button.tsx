import React from 'react';
import styled from 'styled-components';
import { Icon, IconSize } from '../icon/icon';
import { resetButton } from '../../support/css-helpers';
import { lighten } from 'polished';
import { Link } from '../../components/links/links';
import { TextStyles } from '../../typography';

const StyledButton = styled(Link)`
  ${resetButton};

  display: inline-flex;
  align-items: center;
  padding: 8px 0;
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
  margin-right: 10px;
`;

const ButtonText = styled.span`
  ${TextStyles.toplineR};
  line-height: 24px;
  padding-left: 16px;
  padding-right: 6px;
`;

type RegularButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  to?: string;
};

export const Button = (props: RegularButtonProps) => {
  if (props.to) {
    return (
      <StyledButton to={props.to}>
        <ButtonText>{props.children}</ButtonText>
        <StyledIcon show={'chevron_right'} size={IconSize.NORMAL}/>
      </StyledButton>
    )
  } else {
    return (
      <StyledButton as="button" {...props}>
        <ButtonText>{props.children}</ButtonText>
        <StyledIcon show={'chevron_right'} size={IconSize.NORMAL}/>
      </StyledButton>
    )
  }
};

