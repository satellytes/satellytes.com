import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React, { FC } from 'react';
import { DefaultFlares } from '../default-flares';
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

export const Snow: FC<SnowProps> = ({ amount }) => {
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
