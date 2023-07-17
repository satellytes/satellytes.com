import { Flare } from './flare';
import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';
import styled from 'styled-components';
import { DefaultFlares } from './default-flares';

export const AuroraRainyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #231f67 0%, rgba(77, 121, 255, 0.27) 90%);
  position: absolute;
`;
export const Rain = (amount) => {
  return (
    <>
      <AuroraRainyFlareColor />
      <Flare
        noAnimation={true}
        size={970}
        blur={125}
        background={
          'linear-gradient(180deg, #4d79ff 0%, rgba(77, 121, 255, 0.15) 100%)'
        }
        x={'38vw'}
        y={'25vh'}
      />
      <Flare
        noAnimation={true}
        size={970}
        background={'linear-gradient(180deg, #2a275f 0%, #535364 100%)'}
        blur={125}
        x={'30vw'}
        y={'15vh'}
      />
      <Flare
        noAnimation={true}
        size={1094}
        background={`linear-gradient(180deg, #150b28 0%, rgba(35, 33, 131, 0.15) 100%)`}
        blur={125}
        x={'64vw'}
        y={'64vh'}
      />
      <DefaultFlares />
      <PrecipitationEffect
        dropCount={amount}
        speed={1}
        type={PrecipitationType.Rain}
        speedDeviation={0.1}
      />
    </>
  );
};
