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
import { ContentfulVacancy } from '../../../types';
import { ImageHero } from '../../content/heroes';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageSpacer } from '../../ui/image/image-spacer';
import { OfficeImage } from '../../../pages';

interface CareerPageProps {
  positions: ContentfulVacancy[];
  heroImageData: IGatsbyImageData;
  officeImages: OfficeImages;
}

type OfficeImages = { [relativePath: string]: OfficeImage };

export const CareerPage = ({
  positions,
  heroImageData,
  officeImages,
}: CareerPageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    title: t('career.leadbox.title'),
    illustration: 'astronaut_012',
    contact: {
      headline: t('career.leadbox.subtitle'),
      title: t('career.leadbox.text'),
      email: t('career.leadbox.mail'),
    },
  };

  return (
    <Layout
      leadbox={leadbox}
      transparentHeader={true}
      light={true}
      hero={<ImageHero image={heroImageData} />}
    >
      <ContentBlockContainer>
        <SectionHeader
          as={'h1'}
          kicker={t<string>('career.introduction.kicker')}
          headline={t<string>('career.introduction.headline')}
        >
          {t('career.introduction.paragraphs.0')}
        </SectionHeader>
        <ApplicationProcess />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Openings jobs={positions} />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-03.jpg']} />

      <ContentBlockContainer>
        <Culture />
      </ContentBlockContainer>

      <ImageSpacer image={officeImages['office/sy-office-02.jpg']} />

      <ContentBlockContainer>
        <Perks />
      </ContentBlockContainer>
    </Layout>
  );
};
