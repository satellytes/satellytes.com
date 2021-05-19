import styled from 'styled-components';
import React from 'react';

const StaticReplacementLayout = styled.div`
  height: 560px;
`;
const ImageFit = styled.img`
  object-fit: cover;
  width: 100%;
  height: 560px;
`;
export const StaticReplacement = ({ url }) => {
  return (
    <StaticReplacementLayout>
      <ImageFit
        src={url}
        alt="Static version of an interactive map showing the location of our office."
      />
    </StaticReplacementLayout>
  );
};
