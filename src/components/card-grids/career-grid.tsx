import React from 'react';
import styled from 'styled-components';

import { Card } from '../cards/card';
import { Grid } from '../grid/grid';
import { up } from '../style-utils/breakpoint';

interface CareerGridProps {
  careerData: {
    role: string;
    description: string;
    link: string;
  }[];
}

const CardGrid = styled(Grid)`
  &&& {
    padding: 0;
    grid-gap: 16px;
    margin-bottom: 40px;

    ${up('md')} {
      grid-gap: 24px;
      margin-bottom: 80px;
    }
  }
`;

const CareerCard = styled(Card)`
  ${up('md')} {
    min-height: 400px;
  }
`;

export const CareerGrid: React.FC<CareerGridProps> = ({ careerData }) => {
  return (
    <CardGrid>
      {careerData.map((item, id) => (
        <CareerCard
          key={id}
          title={item.role}
          text={item.description}
          link={item.link}
        />
      ))}
    </CardGrid>
  );
};
