import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';
import { DefaultFlares } from '../default-flares';
import styled from 'styled-components';

export const AuroraSnowyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(73, 67, 203, 0.6) 0%,
    rgba(77, 121, 255, 0) 90%
  );
  position: absolute;
`;

export const Snow = (amount) => {
  return (
    <>
      <AuroraSnowyFlareColor />
      <PrecipitationEffect
        dropCount={amount}
        speed={10}
        type={PrecipitationType.Snow}
        speedDeviation={3}
      />
      <DefaultFlares />
    </>
  );
};
