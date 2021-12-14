import { AuroraHero } from '../../new-components/heroes';
import React from 'react';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Career } from './career';
import { Service } from './service';
import { Blog } from './blog';
import { BlogPostTeaser, SyPersonioJob } from '../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageSpacer } from './image-spacer';

interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

type OfficeImages = { [relativePath: string]: OfficeImage };

interface LandingpageProps {
  positions: SyPersonioJob[];
  posts: BlogPostTeaser[];
  officeImages: OfficeImages;
}

export const Landingpage = ({
  positions,
  posts,
  officeImages,
}: LandingpageProps) => {
  const { t } = useTranslation();

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      hero={
        <AuroraHero title={'Satellytes'}>{t('main.description')}</AuroraHero>
      }
    >
      <ContentBlockContainer>
        <Service />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-01.jpg']} />

      <ContentBlockContainer>
        <Career positions={positions} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-02.jpg']} />

      <ContentBlockContainer>
        <Blog posts={posts} />
      </ContentBlockContainer>
    </LayoutV2>
  );
};
