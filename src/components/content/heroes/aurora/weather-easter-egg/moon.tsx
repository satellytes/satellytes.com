import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface MoonProps {
  nightPercentage: number;
}

const generateStars = (starCount: number) => {
  const stars: React.JSX.Element[] = [];

  for (let i = 0; i < starCount; i++) {
    stars.push(
      <StarsDiv x={Math.random() * 120 - 10} y={Math.random() * 120 - 10} />,
    );
  }

  return stars;
};

const BackgroundDiv = styled.div<{ nightPercentage: number }>`
  position: absolute;
  background: #000000;
  width: 100%;
  height: 100%;
  opacity: ${(props) =>
    props.nightPercentage === 0 || props.nightPercentage === 100 ? '0' : '1'};
`;

const StarsDiv = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 3px;
  height: 3px;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  border-radius: 100%;
  background: #ffffff;
`;

const MoonDiv = styled.div<{ nightPercentage: number }>`
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: ${(props) =>
    props.nightPercentage === 0 || props.nightPercentage === 100 ? '0' : '1'};
  background: #ffffff;
  left: calc(${(props) => props.nightPercentage}% - 50px);
  bottom: calc(
    ${(props) =>
        (1 / 125) *
          (-(props.nightPercentage - 50) * (props.nightPercentage - 50)) +
        70}%
      // parabola formula to get the moon to move in a parabola
  );
  border-radius: 50%;
  filter: blur(5px);
`;

const ParallaxDiv = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translate(
    ${(props) => -props.x * 0.09}px,
    ${(props) => -props.y * 0.09}px
  );
`;

export const Moon = ({ nightPercentage }: MoonProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setStars(generateStars(120));
  }, []);

  return (
    <>
      <BackgroundDiv nightPercentage={nightPercentage} />
      <ParallaxDiv x={mousePos.x} y={mousePos.y}>
        {nightPercentage === 0 || nightPercentage === 100 ? '' : stars}
      </ParallaxDiv>
      <MoonDiv nightPercentage={nightPercentage} />
    </>
  );
};
