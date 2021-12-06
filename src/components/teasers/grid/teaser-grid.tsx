import React from 'react';
import styled from 'styled-components';
import { up } from '../../breakpoint/breakpoint';

const ScrollContainer = styled.div`
  overflow-x: auto;

  /**
   * we stretch the container on the left and right over the PageLayout, 
   * so that they scroll from side to side
   */
  margin-right: -24px;
  margin-left: -24px;
  padding-left: 24px;

  ${up('md')} {
    margin-right: 0;
    margin-left: 0;
    padding-left: 0;
  }
`;

const StyledTeaserGrid = styled.div<{ amountOfChildren: number }>`
  display: grid;
  gap: 24px;

  justify-items: stretch;
  grid-template-columns: ${(props) =>
    `repeat(${props.amountOfChildren}, minmax(224px, 1fr))`};

  ${up('md')} {
    gap: 70px;
    grid-template-columns: ${(props) =>
      props.amountOfChildren > 3 ? '1fr 1fr' : '1fr 1fr 1fr'};
  }
`;

interface TeaserGridProps {
  children: React.ReactNode | React.ReactNode[];
}

export const TeaserGrid = (props: TeaserGridProps): JSX.Element => {
  const amountOfChildren = React.Children.count(props.children);

  return (
    <ScrollContainer>
      <StyledTeaserGrid amountOfChildren={amountOfChildren}>
        {props.children}
      </StyledTeaserGrid>
    </ScrollContainer>
  );
};
