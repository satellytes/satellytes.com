import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

import { Image } from '../../new-components/image/image';

const ImageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const Office = () => {
  return (
    <ImageContentWrapper>
      <Image description="" textAlign="right">
        <StaticImage
          src="./../../images/office/sy-office-03.jpg"
          alt="kitchen"
          aspectRatio={564 / 295}
          width={564}
        />
      </Image>
      <Image description="" textAlign="left">
        <StaticImage
          src="./../../images/office/sy-office-02.jpg"
          alt="kitchen"
          aspectRatio={564 / 295}
          width={564}
        />
      </Image>
      <Image description="" textAlign="right">
        <StaticImage
          src="./../../images/office/sy-office-04.jpg"
          alt="kitchen"
          aspectRatio={564 / 295}
          width={564}
        />
      </Image>
    </ImageContentWrapper>
  );
};
