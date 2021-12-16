import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

import { Image } from '../../components/image/image';
import { SectionHeader } from '../../components/section-header/section-header';
import { useTranslation } from 'react-i18next';

const ImageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Header = styled(SectionHeader)`
  margin-bottom: 40px;
`;

export const Office = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header
        headline={t('about-us.office.heading')}
        kicker={t('about-us.office.title')}
      >
        {t('about-us.office.text')}
      </Header>

      <ImageContentWrapper>
        <Image description="" textAlign="right">
          <StaticImage
            src="../../assets/images/office/sy-office-03.jpg"
            alt="kitchen"
            aspectRatio={564 / 295}
            width={564}
          />
        </Image>
        <Image description="" textAlign="left">
          <StaticImage
            src="../../assets/images/office/sy-office-02.jpg"
            alt="kitchen"
            aspectRatio={564 / 295}
            width={564}
          />
        </Image>
        <Image description="" textAlign="right">
          <StaticImage
            src="../../assets/images/office/sy-office-04.jpg"
            alt="kitchen"
            aspectRatio={564 / 295}
            width={564}
          />
        </Image>
      </ImageContentWrapper>
    </div>
  );
};
