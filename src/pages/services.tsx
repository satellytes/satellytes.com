import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import SEO from '../components/seo';
import { LayoutV2 } from '../components/layout/layout-v2';
import { Aurora } from '../components/aurora/aurora';
import { TextStyles } from '../components/typography/typography-v2';
import { HeaderBlock } from '../components/header-block/header-block';
import { SectionHeader } from '../new-components/section-header/section-header';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const HeroContainer = styled.div`
  position: relative;

  margin: 0 auto;
  padding: 437px 24px 48px 24px;

  color: #ffffff;

  ${up('md')} {
    padding: 479px 0 108px 0;

    max-width: 816px;
  }
`;

const ServicesPageTitle = styled.h1`
  ${TextStyles.headlineL};

  ${up('md')} {
    ${TextStyles.headlineXL};
  }
  margin: 0;
`;

interface ServicesPageProps {
  location: Location;
}

const ServicesPage = ({ location }: ServicesPageProps) => {
  const { t } = useTranslation();

  const leadbox = {
    title: t('services.leadbox.title'),
    subtitle: t('services.leadbox.subtitle'),
    text: t('services.leadbox.text'),
    mail: t('services.leadbox.mail'),
    icon: 'space_shuttle_043',
  };

  return (
    <>
      <SEO title={`${t('services.title')} | Satellytes`} location={location} />
      <LayoutV2
        transparentHeader={true}
        light={true}
        leadbox={leadbox}
        hero={
          <>
            <Aurora />
            <HeroContainer>
              <ServicesPageTitle>{t('services.title')}</ServicesPageTitle>
            </HeroContainer>
          </>
        }
      >
        <ContentBlockContainer>
          <SectionHeader
            headline={t('services.header.title')}
            kicker={t('services.header.kicker')}
          >
            {t('services.header.text')}
          </SectionHeader>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline={t('services.contentblocks.first.title')}
            illustration="rocket_011"
            large
            topline={t('services.contentblocks.first.kicker')}
          >
            {t('services.contentblocks.first.text')}
          </HeaderBlock>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline={t('services.contentblocks.second.title')}
            illustration="rocket_011"
            large
            topline={t('services.contentblocks.second.kicker')}
          >
            {t('services.contentblocks.second.text')}
          </HeaderBlock>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HeaderBlock
            headline={t('services.contentblocks.third.title')}
            illustration="rocket_011"
            large
            topline={t('services.contentblocks.third.kicker')}
          >
            {t('services.contentblocks.third.text')}
          </HeaderBlock>
        </ContentBlockContainer>
      </LayoutV2>
    </>
  );
};

export default ServicesPage;

export const ServicesPageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
