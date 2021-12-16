import React from 'react';
import styled from 'styled-components';
import { Aurora, AuroraType } from './aurora/aurora';
import { HeroContainer, TextContainer } from './support';
import { HeroText, HeroWithText } from './hero-text';

const AuroraFullSize = styled(Aurora)`
  grid-area: 1/1;
`;

interface AuroraHeroProps extends HeroWithText {
  auroraType?: AuroraType;
}

export const AuroraHero = ({
  title,
  kicker,
  children,
  auroraType,
}: AuroraHeroProps) => {
  return (
    <HeroContainer>
      <AuroraFullSize type={auroraType} />

      <TextContainer>
        <HeroText title={title} kicker={kicker}>
          {children}
        </HeroText>
      </TextContainer>
    </HeroContainer>
  );
};
