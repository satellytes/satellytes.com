import styled from 'styled-components';
import { Illustration } from './illustration';
import React from 'react';

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 10px;
`;

const Name = styled.span`
  font-weight: bold;
  margin-top: 10px;
`;

const IllustrationPreviewLayout = styled.div`
  user-select: all;
  display: grid;
  justify-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 5px;

  &:hover {
    background-color: #efefef;
  }
`;

/**
 * A (story-local) component to help displaying an illustration as a Tile with Name.
 */
export const IllustrationPreview = (props) => {
  return (
    <IllustrationPreviewLayout>
      <Illustration key={props.name} show={props.name} />
      <Name>{props.name}</Name>
    </IllustrationPreviewLayout>
  );
};
