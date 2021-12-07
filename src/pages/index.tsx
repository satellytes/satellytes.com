import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/style-utils/breakpoint';
import SEO from '../components/seo';
import { LayoutV2 } from '../components/layout/layout-v2';
import { Aurora } from '../components/aurora/aurora';
import { TextStyles } from '../components/typography/typography-v2';
import { HeaderBlock } from '../components/header-block/header-block';
import { Teaser } from '../components/teasers/teaser';
import {
  Illustration,
  IllustrationSize,
} from '../components/illustration/illustration';
import { TeaserGrid } from '../components/teasers/grid/teaser-grid';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SyPersonioJob } from '../@types/personio';

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

const HomePageHeaderBlock = styled(HeaderBlock)`
  margin-bottom: 80px;
`;

export interface LocalesQuery {
  edges: {
    node: {
      ns: string;
      language: string;
      data: string;
    };
  }[];
}

interface IndexPageProps {
  data: {
    locales: LocalesQuery;

    allSyPersonioJob: {
      nodes: SyPersonioJob[];
    };
  };
  location: Location;
}
interface CareerSectionProps {
  positions: SyPersonioJob[];
}

const CareerSection = ({ positions }: CareerSectionProps) => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <HomePageHeaderBlock
        topline={t('main.career.topline')}
        headline={t('main.career.title')}
        large={true}
      >
        {t('main.career.text')}
      </HomePageHeaderBlock>
      <TeaserGrid>
        {positions.map((item) => (
          <Teaser key={item.id} title={item.name} linkTo={item.fields.path}>
            {item.short}
          </Teaser>
        ))}
      </TeaserGrid>
    </ContentBlockContainer>
  );
};

const IndexPage = ({
  location,
  data: { allSyPersonioJob },
}: IndexPageProps) => {
  const { t } = useTranslation();
  const jobPositions = allSyPersonioJob.nodes;

  return (
    <>
      <SEO title="Satellytes" location={location} />
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
          <HomePageHeaderBlock
            topline={t('main.services.topline')}
            headline={t('main.services.title')}
            large={true}
          >
            {t('main.services.text')}
          </HomePageHeaderBlock>

          <TeaserGrid>
            <Teaser
              title={t('main.services.teasers.first.title')}
              linkTo="/services"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              {t('main.services.teasers.first.text')}
            </Teaser>
            <Teaser
              title={t('main.services.teasers.second.title')}
              linkTo="/services"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              {t('main.services.teasers.second.text')}
            </Teaser>
            <Teaser
              title={t('main.services.teasers.third.title')}
              linkTo="/services"
              cover={
                <Illustration
                  show="space_shuttle_043"
                  size={IllustrationSize.MEDIUM}
                />
              }
            >
              {t('main.services.teasers.third.text')}
            </Teaser>
          </TeaserGrid>
        </ContentBlockContainer>

        <CareerSection positions={jobPositions} />
      </LayoutV2>
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
  query ($language: String!) {
    allSyPersonioJob(filter: { lang: { eq: $language } }) {
      nodes {
        id
        lang
        jobId
        name
        short
        createdAt
        slug
        fields {
          path
        }
      }
    }

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
