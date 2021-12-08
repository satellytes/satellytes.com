import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { SyPersonioJob } from '../@types/personio';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { TextTitle } from '../components/typography/typography';
import { CareerForm } from '../components/career-form/career-form';
import { HEADER_HEIGHT } from '../components/header/header';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;

  margin-top: calc(60px + ${HEADER_HEIGHT});
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: calc(120px + ${HEADER_HEIGHT});
    font-size: 48px;
  }
`;

export const SectionHeadline = styled(TextTitle)`
  margin-top: 40px;
  margin-bottom: 16px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

export const PersonioHtml = styled.div`
  font-size: 16px;
  line-height: 150%;

  margin-top: 0;
  margin-bottom: 16px;

  & > ul {
    list-style: none;
    line-height: 150%;

    padding-left: 0;

    > li:before {
      content: '·';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }

    > li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 16px;
    }
  }
`;

interface CareerPageProps {
  pageContext: {
    language: string;
    translation: string;
    i18n: {
      originalPath: string;
    };
  };
  location: Location;
  data: {
    syPersonioJob: SyPersonioJob;
  };
}
const CareerPage: React.FC<CareerPageProps> = (props): JSX.Element => {
  const { pageContext } = props;
  const position = props.data.syPersonioJob;

  const socialCardImage = position.fields.socialCard;

  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const breadcrumb = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/career', label: t('navigation.career') },
    {
      pathname: pageContext.i18n.originalPath,
      label: position.name,
    },
  ];
  const scrollToStart = () => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const IntroText = ({ text }) => {
    if (!text) {
      return null;
    }
    return <PersonioHtml dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout
        siteTitleUrl="/career/"
        transparentHeader={true}
        translation={pageContext.translation}
        showLanguageSwitch={Boolean(pageContext.translation)}
        breadcrumb={breadcrumb}
      >
        <SEO
          imageUrl={socialCardImage}
          title={t('career.seo.title-detail', {
            name: position.name,
          })}
          description={t('career.seo.description-detail', {
            name: position.name,
          })}
          translatedPath={pageContext.translation}
          noTranslation={!pageContext.translation}
          location={props.location}
        />
        <Grid>
          <GridItem xs={12} md={8}>
            <Title>{position.name}</Title>
            <IntroText text={position.short} />
            {position.sections.map(({ headline, descriptionHtml }, index) => {
              return (
                <div key={index}>
                  <SectionHeadline>{headline}</SectionHeadline>
                  <PersonioHtml
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>
              );
            })}
          </GridItem>

          <GridItem xs={12} md={8} ref={ref}>
            <CareerForm
              company_id="41230"
              recruiting_channel_id="329206"
              access_token="89b2acfa3a239b75c7d6"
              job_position_id={position.jobId + ''}
              scrollToStart={scrollToStart}
            />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export const CareerDetailsPageQuery = graphql`
  query ($language: String!, $id: String!) {
    syPersonioJob(id: { eq: $id }) {
      fields {
        socialCard
      }
      id
      lang
      jobId
      name
      short
      createdAt
      slug
      sections {
        headline
        descriptionHtml
        description
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

export default CareerPage;
