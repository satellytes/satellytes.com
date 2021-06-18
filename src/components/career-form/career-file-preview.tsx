import styled from 'styled-components';
import React from 'react';
import { Clear } from '../icons/clear';

export const FilePreview = ({ index, file, onClick }) => {
  return (
    <Preview>
      {/* checkmark */}
      <span>{(file as File).name}</span>
      <button onClick={(event) => onClick(event, index)}>
        <Clear />
      </button>
    </Preview>
  );
};

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 25px 24px;
  background: rgba(122, 143, 204, 0.2);
  overflow: ellipsis;
  line-height: 150%;

  span {
    margin-left: 12px;
  }
`;
