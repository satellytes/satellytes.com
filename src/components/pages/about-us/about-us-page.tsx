import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../../layout/layout';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Gallery } from './gallery';
import { GalleryItem } from '../../../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageHero } from '../../content/heroes';
import { SectionHeader } from '../../content/section-header/section-header';
import { StyledLink } from '../contact/address';

interface AboutUsPageProps {
  images: GalleryItem[];
  heroImageData: IGatsbyImageData;
}

export const AboutUsPage = (props: AboutUsPageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: t('about-us.leadbox.title'),
    link: {
      title: t('about-us.leadbox.link'),
      href: '/career',
    },
  };

  return (
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<ImageHero image={props.heroImageData} />}
    >
      <SectionHeader
        headline={t<string>('about-us.intro.heading')}
        kicker={t<string>('about-us.intro.title')}
      >
        <p>{t('about-us.intro.text')}</p>
        <p>{t('about-us.intro.invite')}</p>
        <StyledLink to="https://g.page/satellytes?share">
          Google Maps &gt;
        </StyledLink>
      </SectionHeader>

      <ContentBlockContainer>
        <Gallery items={props.images} />
      </ContentBlockContainer>
    </Layout>
  );
};
