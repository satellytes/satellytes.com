import React from 'react';
import { ApplicationProcess } from './application-process';
import { Openings } from './openings';
import { SectionHeader } from '../../content/section-header/section-header';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Culture } from './culture';
import { Perks } from './perks';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import {
  ContentfulPage,
  ContentfulSectionHeader,
  ContentfulVacancy,
} from '../../../types';
import { ImageHero } from '../../content/heroes';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageSpacer } from '../../ui/image/image-spacer';
import { OfficeImage } from '../../../pages';
import { MobileOnlyText } from '../../content/heroes/support';

interface CareerPageProps {
  positions: ContentfulVacancy[];
  heroImageData: IGatsbyImageData;
  officeImages: OfficeImages;
  page: ContentfulPage;
  leadbox: LeadboxProps;
  careerIntroduction: ContentfulSectionHeader;
}

type OfficeImages = { [relativePath: string]: OfficeImage };

export const CareerPage = ({
  positions,
  heroImageData,
  officeImages,
  page,
  leadbox,
  careerIntroduction,
}: CareerPageProps) => {
  const { t } = useTranslation();

  return (
    <Layout
      leadbox={leadbox}
      transparentHeader={true}
      light={true}
      hero={
        <ImageHero hideMobileText title={page.title} image={heroImageData}>
          {' '}
          {page.description as unknown as string}{' '}
        </ImageHero>
      }
    >
      <ContentBlockContainer>
        <SectionHeader
          kicker={careerIntroduction.kicker as string}
          headline={careerIntroduction.headline as string}
        >
          <MobileOnlyText>
            {page.description as unknown as string}
          </MobileOnlyText>
          {careerIntroduction.paragraphs?.[0]?.paragraph?.paragraph as string}{' '}
        </SectionHeader>
        <ApplicationProcess />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Openings jobs={positions} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-05.jpg']} />

      <ContentBlockContainer>
        <Culture />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-06.jpg']} />

      <ContentBlockContainer>
        <Perks />
      </ContentBlockContainer>
    </Layout>
  );
};
