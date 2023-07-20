import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';
import { DefaultFlares, DefaultFlaresDark } from '../default-flares';
import styled from 'styled-components';

export const AuroraSnowyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #4943cb99 0%, #4d79ff00 90%);
  position: absolute;
`;

interface SnowProps {
  amount: number;
}

export const Snow = ({ amount }: SnowProps) => {
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
      <DefaultFlaresDark />
    </>
  );
};
