import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { up } from '../breakpoint/breakpoint';
import React from 'react';
import { FluidObject } from 'gatsby-image';
import { HEADER_HEIGHT } from './header';
import { ResponsiveCloudinaryBackgroundImage } from '../image/cloudinary-image';

const StyledBackgroundImage = styled(BackgroundImage)`
  height: calc(344px - ${() => HEADER_HEIGHT});

  ${up('md')} {
    height: calc(560px - ${() => HEADER_HEIGHT});
  }
`;

interface HeroImageProps {
  image?: FluidObject | string;
}

export const HeroImage: React.FC<HeroImageProps> = (props) => {
  if (props.image && typeof props.image === 'object') {
    return (
      <StyledBackgroundImage fluid={props.image}>
        {props.children}
      </StyledBackgroundImage>
    );
  }
  if (typeof props.image === 'string') {
    return (
      <ResponsiveCloudinaryBackgroundImage src={props.image}>
        {props.children}
      </ResponsiveCloudinaryBackgroundImage>
    );
  }
  return <>{props.children}</>;
};
