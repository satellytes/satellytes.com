import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
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

interface AllClientsQuery {
  nodes: {
    start: string;
    name: string;
    nameEN: string;
    path: string;
  }[];
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
    allClientsJson: AllClientsQuery;
  };
  location: Location;
}

const IndexPage = ({ location }: IndexPageProps) => {
  const { t } = useTranslation();
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
                Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
                eros. Maecenas sed diam eget risus varius blandit sit amet non
                magna.
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
              linkTo="/clients"
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
              linkTo="/clients"
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
              linkTo="/clients"
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
        <ContentBlockContainer>
          <HomePageHeaderBlock
            topline={t('main.clients.topline')}
            headline={t('main.clients.title')}
            large={true}
          >
            Wir unterstützen große Konzerne bei der Umsetzung ihrer digitalen
            Strategien. Finden Sie heraus für welche Kunden & Branchen wir tätig
            sind. Integer posuere erat a ante venenatis dapibus posuere velit
            aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
            eros. Maecenas sed diam eget risus varius blandit sit amet non
            magna.
          </HomePageHeaderBlock>
          <TeaserGrid>
            <Teaser
              title={t('main.clients.teasers.first.title')}
              linkTo="/clients"
            >
              Integer posuere erat a ante venenatis dapibus posuere velit
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Maecenas sed diam eget risus varius blandit sit amet non
              magna.
            </Teaser>
            <Teaser
              title={t('main.clients.teasers.second.title')}
              linkTo="/clients"
            >
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Maecenas sed diam eget risus varius blandit sit amet non
              magna.
            </Teaser>
            <Teaser
              title={t('main.clients.teasers.third.title')}
              linkTo="/clients"
            >
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Maecenas sed diam eget risus varius blandit sit amet non
              magna.
            </Teaser>
            <Teaser
              title={t('main.clients.teasers.fourth.title')}
              linkTo="/clients"
            >
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Maecenas sed diam eget risus varius blandit sit amet non
              magna.
            </Teaser>
          </TeaserGrid>
        </ContentBlockContainer>
        <ContentBlockContainer>
          <HomePageHeaderBlock
            topline={t('main.career.topline')}
            headline={t('main.career.title')}
            large={true}
          >
            {t('main.career.text')}
          </HomePageHeaderBlock>
          <TeaserGrid>
            <Teaser
              title={t('main.career.teasers.first.title')}
              linkTo="/career"
            >
              {t('main.career.teasers.first.text')}
            </Teaser>
            <Teaser
              title={t('main.career.teasers.second.title')}
              linkTo="/career"
            >
              {t('main.career.teasers.second.text')}
            </Teaser>
            <Teaser
              title={t('main.career.teasers.third.title')}
              linkTo="/career"
            >
              {t('main.career.teasers.third.text')}
            </Teaser>
          </TeaserGrid>
        </ContentBlockContainer>
      </LayoutV2>
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
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
    allClientsJson {
      nodes {
        name
        nameEN
        path
        start
      }
    }
  }
`;
