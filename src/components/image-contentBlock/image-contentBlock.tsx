import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const ImageWrapper = styled.div``;

const ImageContentBlock = (props) => {
  return (
    <ImageWrapper>
      <StaticImage alt="Image" src="../../images/office/sy-office-01.jpg" />
      Hallo
    </ImageWrapper>
  );
};

export default ImageContentBlock;
