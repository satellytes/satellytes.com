import styled from 'styled-components';
import { WeatherType } from './aurora-types';
import { Flare, FlareType } from './flare';
import {
  CloudBackground,
  CloudFrame,
  CloudGroup,
  CloudOverlapGroup,
  CloudOverlay,
  CloudShape,
  CloudWrapper,
} from './clouds';
import PrecipitationEffect, { PrecipitationType } from './precipitation-effect';
import React from 'react';

const BACKGROUND_LAYER_Z = -2;
const FOREGROUND_LAYER_Z = -1;

interface AuroraBackgroundProps {
  source: string;
  weather: WeatherType;
}

export const AuroraBackground = styled.div<AuroraBackgroundProps>`
  background: ${(props) => {
    switch (props.weather) {
      case WeatherType.Sunny:
        return '#3E61EE';
      case WeatherType.Rainy:
        return '#9BA3BB';
      default:
        return '#202840';
    }
  }};
  position: absolute;
  z-index: ${BACKGROUND_LAYER_Z};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  ${(props) =>
    props.weather === WeatherType.NotSet
      ? `
    background-image: url(${props.source});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center -20vw;
  `
      : ''}
`;

export const AuroraForeground = styled.div`
  position: absolute;
  z-index: ${FOREGROUND_LAYER_Z};
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const AuroraContainer = styled.div`
  pointer-events: none;
`;

export const AuroraRainyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #110f31 0%, rgba(77, 121, 255, 0.15) 90%);
  position: absolute;
`;

export const AuroraSnowyFlareColor = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(99, 93, 224, 0.6) 0%,
    rgba(77, 121, 255, 0) 90%
  );
  position: absolute;
`;

export const flaresByWeather: { [key in WeatherType] } = {
  [WeatherType.Sunny]: (
    <>
      <Flare
        opacity={0.9}
        speedMultiplier={0.1}
        stepSize={-80}
        flareType={FlareType.RADIAL}
        x={'20vw'}
        y={'40vh'}
        size={400}
        rotation={180}
      />
      <Flare
        stepSize={0}
        flareType={FlareType.LIGHT}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
      <Flare
        stepSize={20}
        flareType={FlareType.LIGHT}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
    </>
  ),
  [WeatherType.Cloudy]: (
    <CloudFrame>
      <CloudWrapper>
        <CloudGroup>
          <CloudOverlapGroup>
            <CloudShape
              height={970}
              left={10}
              top={50}
              width={970}
              background={
                'linear-gradient(180deg,rgb(76.5, 121.12, 255) 0%,rgba(76.5, 121.12, 255, 0.15) 100%)'
              }
            />
            <CloudBackground />
            <CloudShape
              height={1094}
              left={35}
              top={30}
              width={1094}
              background={
                'linear-gradient(180deg, rgb(86, 80.98, 96.69) 0%, rgba(99.44, 98.73, 133.87, 0.15) 100%)'
              }
            />
            <CloudOverlay height={284} width={284} top={45} left={15} />
            <CloudOverlay
              height={693}
              width={693}
              top={80}
              left={70}
              customStyle={'rotate(122.06deg);'}
            />
            <CloudOverlay height={333} width={333} top={50} left={25} />
            <CloudOverlay height={308} width={308} top={62} left={95} />
            <CloudOverlay height={457} width={457} top={45} left={65} />
            <CloudOverlay
              height={285}
              width={285}
              top={43}
              left={30}
              customStyle={`
            background: linear-gradient(
              180deg,
              rgb(44, 42, 90) 0%,
              rgba(42, 27, 113, 0.64) 100%
            );
            mix-blend-mode: multiply;
            opacity: 0.1;
          `}
            />
            <CloudOverlay height={150} width={150} bottom={10} right={30} />
            <CloudOverlay height={200} width={200} top={60} left={5} />
            <CloudOverlay height={200} width={200} top={10} left={10} />
            <CloudOverlay height={250} width={250} top={30} left={30} />
            <CloudOverlay height={180} width={180} top={50} left={50} />
            <CloudOverlay height={300} width={300} top={70} left={70} />
            <CloudOverlay height={230} width={230} top={90} left={90} />
            <CloudOverlay height={200} width={200} top={70} left={5} />
            <CloudOverlay height={200} width={200} top={110} left={10} />
            <CloudOverlay height={550} width={550} top={90} left={30} />
            <CloudOverlay height={180} width={180} top={100} left={50} />
            <CloudOverlay height={300} width={300} top={130} left={70} />
            <CloudOverlay height={230} width={230} top={140} left={90} />
          </CloudOverlapGroup>
        </CloudGroup>
      </CloudWrapper>
    </CloudFrame>
  ),
  [WeatherType.Rainy]: (
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
      <PrecipitationEffect
        dropCount={550}
        speed={1}
        type={PrecipitationType.Rain}
        speedDeviation={0.1}
      />
    </>
  ),
  [WeatherType.Snowy]: (
    <>
      <AuroraSnowyFlareColor />
      <PrecipitationEffect
        dropCount={100}
        speed={10}
        type={PrecipitationType.Snow}
        speedDeviation={3}
      />
    </>
  ),
  [WeatherType.NotSet]: (
    <>
      <Flare
        stepSize={20}
        flareType={FlareType.DARK}
        x={'50vw'}
        y={'50vw'}
        size={150}
        rotation={30}
        animationOffset={3}
      />
      <Flare
        stepSize={0}
        flareType={FlareType.DARK}
        x={'70vw'}
        y={'300px'}
        size={100}
        rotation={80}
        animationOffset={14}
      />
    </>
  ),
};
