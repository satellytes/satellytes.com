import styled from 'styled-components';
import { Icon } from './icon';
import React from 'react';
import { ellipsis } from 'polished';

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  gap: 10px;
`;

const Name = styled.span`
  font-weight: bold;
  margin-top: 10px;
  ${ellipsis()}
`;

const IconPreviewLayout = styled.div`
  aspect-ratio: 1;

  user-select: all;
  display: grid;
  justify-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 5px;
  align-content: center;

  &:hover {
    background-color: #efefef;

    .icon {
      background-color: #fff;
    }
  }
`;

export const IconPreview = (props) => {
  return (
    <IconPreviewLayout title={props.name}>
      <Icon className={'icon'} key={props.name} show={props.name} />
      <Name>{props.name}</Name>
    </IconPreviewLayout>
  );
};
