import { Flare, FlareType } from './flare';
import React from 'react';

export const DefaultFlares = () => {
  return (
    <>
      <Flare
        opacity={0.5}
        speedMultiplier={2}
        stepSize={20}
        flareType={FlareType.LIGHT}
        x={'20vw'}
        y={'90vh'}
        size={550}
        rotation={0}
      />
      <Flare
        opacity={0.3}
        stepSize={40}
        flareType={FlareType.LIGHT}
        x={'80vw'}
        y={'20vw'}
        size={250}
        rotation={70}
        animationOffset={7}
      />
      <Flare
        opacity={0.6}
        speedMultiplier={0.5}
        stepSize={-80}
        flareType={FlareType.LIGHT}
        x={'20vw'}
        y={'0vh'}
        size={400}
        rotation={180}
      />
    </>
  );
};
