import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { up } from '../breakpoint/breakpoint';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import { HEADER_HEIGHT } from './header';

const StyledBackgroundImage = styled(BackgroundImage)`
  height: calc(344px - ${() => HEADER_HEIGHT});

  ${up('md')} {
    height: calc(560px - ${() => HEADER_HEIGHT});
  }
`;

export const HeroImage: React.FC<{ fluid?: FluidObject }> = (props) => {
  if (props.fluid) {
    return (
      <StyledBackgroundImage fluid={props.fluid}>
        {props.children}
      </StyledBackgroundImage>
    );
  }
  return <>{props.children}</>;
};
