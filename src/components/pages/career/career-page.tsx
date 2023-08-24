import React from 'react';
import { ApplicationProcess } from './application-process';
import { Openings } from './openings';
import { SectionHeader } from '../../content/section-header/section-header';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Culture } from './culture';
import { Perks } from './perks';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import {
  ContentfulAccordionItem,
  ContentfulPage,
  ContentfulSectionHeader,
  ContentfulTeaserItem,
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
  introductionHeader: ContentfulSectionHeader;
  applicationProcessHeader: ContentfulSectionHeader;
  openingsHeader: ContentfulSectionHeader;
  cultureHeader: ContentfulSectionHeader;
  perksHeader: ContentfulSectionHeader;
  cultureTeaser: ContentfulTeaserItem[];
  perksTeaser: ContentfulTeaserItem[];
  applicationProcessAccordion: ContentfulAccordionItem[];
}

type OfficeImages = { [relativePath: string]: OfficeImage };

export const CareerPage = ({
  positions,
  heroImageData,
  officeImages,
  page,
  leadbox,
  introductionHeader,
  applicationProcessHeader,
  openingsHeader,
  cultureHeader,
  perksHeader,
  cultureTeaser,
  perksTeaser,
  applicationProcessAccordion,
}: CareerPageProps) => {
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
          kicker={introductionHeader.kicker as string}
          headline={introductionHeader.headline as string}
        >
          <MobileOnlyText>
            {page.description as unknown as string}
          </MobileOnlyText>
          {introductionHeader.paragraphs?.[0]?.paragraph?.paragraph as string}{' '}
        </SectionHeader>
        <ApplicationProcess
          header={applicationProcessHeader}
          accordion={applicationProcessAccordion}
        />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Openings
          jobs={positions}
          headline={openingsHeader.headline as string}
        />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-05.jpg']} />

      <ContentBlockContainer>
        <Culture header={cultureHeader} teaserItems={cultureTeaser} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-06.jpg']} />

      <ContentBlockContainer>
        <Perks header={perksHeader} teaserItems={perksTeaser} />
      </ContentBlockContainer>
    </Layout>
  );
};
