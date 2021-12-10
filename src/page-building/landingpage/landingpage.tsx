import React from 'react';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Aurora } from '../../components/aurora/aurora';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { TextStyles } from '../../components/typography/typography-v2';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Career } from './career';
import { Service } from './service';

import officeImage01 from '../../images/office/sy-office-01.jpg';
import officeImage02 from '../../images/office/sy-office-04.jpg';
import { Blog } from './blog';
import { BlogPostTeaser, SyPersonioJob } from '../../types';

interface LandingpageProps {
  positions: SyPersonioJob[];
  posts: BlogPostTeaser[];
}

const HeroContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin: 0 auto;
  padding: 285px 24px 48px 24px;

  color: #ffffff;

  ${up('md')} {
    padding: 357px 0 108px 0;

    max-width: 816px;
  }
`;

const IndexPageTitle = styled.h1`
  ${TextStyles.headlineXL};

  margin-top: 0;
  margin-bottom: 32px;
`;

const IndexPageSubTitle = styled.h2`
  ${TextStyles.textL};

  margin-top: 0;
  font-weight: 400;
  max-width: 640px;
`;

const ImageFull = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  
  height: 220px;
  
  ${up('md')}{
    height: 360px;
  }}

`;
const ImageSeparator = ({ image }) => {
  return (
    <FullWidthContainer>
      <ImageFull src={image} />
    </FullWidthContainer>
  );
};

const FullWidthContainer = styled(ContentBlockContainer)`
  grid-column: -1/1;
`;

export const Landingpage = ({ positions, posts }: LandingpageProps) => {
  const { t } = useTranslation();

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      hero={
        <>
          <Aurora />
          <HeroContainer>
            <IndexPageTitle>Satellytes</IndexPageTitle>
            <IndexPageSubTitle as="h2">
              {t('main.description')}
            </IndexPageSubTitle>
          </HeroContainer>
        </>
      }
    >
      <ContentBlockContainer>
        <Service />
      </ContentBlockContainer>

      <ImageSeparator image={officeImage01} />

      <ContentBlockContainer>
        <Career positions={positions} />
      </ContentBlockContainer>

      <ImageSeparator image={officeImage02} />
      <ContentBlockContainer>
        <Blog posts={posts} />
      </ContentBlockContainer>
    </LayoutV2>
  );
};
