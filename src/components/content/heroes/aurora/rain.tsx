import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fallAnimation = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(100vh);
    opacity: 1;
  }
`;

const Raindrop = styled.div<{ color: string; speed: number }>`
  position: absolute;
  width: 3px;
  height: 50px;
  border-radius: 150%;
  background-color: ${(props) => props.color};
  animation: ${fallAnimation} ${(props) => props.speed}s linear infinite;
`;

interface RainDropData {
  id: number;
  color: string;
  speed: number;
  delay: number;
  left: number;
}

interface RainyEffectProps {
  dropCount: number;
  speed?: number;
}

const RainyEffect: React.FC<RainyEffectProps> = ({ dropCount, speed }) => {
  const [rainDrops, setRainDrops] = useState<RainDropData[]>([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = Array.from({ length: dropCount }, (_, index) => ({
        id: index,
        color: '#76a5d2',
        speed: speed || 1,
        delay: Math.random() * 5,
        left: Math.random() * 100,
      }));

      setRainDrops(newDrops);
    };

    generateDrops();
  }, [dropCount]);

  return (
    <>
      {rainDrops.map((drop) => (
        <Raindrop
          key={drop.id}
          color={drop.color}
          speed={drop.speed}
          style={{
            left: `${drop.left}%`,
            top: '-75px',
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </>
  );
};

export default RainyEffect;
