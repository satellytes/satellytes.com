import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { PersonioJobPosition } from './career';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { TextTitle } from '../components/typography/typography';
import { CareerForm } from '../components/career-form/career-form';
import { HEADER_HEIGHT } from '../components/header/header';
import { Aurora, AuroraType } from '../components/aurora/aurora';

const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';

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

const SectionTitle = styled(TextTitle)`
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
    position: PersonioJobPosition;
    socialCardImage: string;
  };
}

const CareerPage = ({ pageContext }: CareerPageProps): JSX.Element => {
  const descriptions = pageContext.position.jobDescriptions.jobDescription.filter(
    ({ name }) => name !== PERSONIO_SHORT_DESCRIPTION_NAME,
  );
  const intro = pageContext.position.jobDescriptions.jobDescription.find(
    ({ name }) => name === PERSONIO_SHORT_DESCRIPTION_NAME,
  );
  const IntroText = ({ text }) => {
    if (!text) {
      return null;
    }
    return <PersonioHtml dangerouslySetInnerHTML={{ __html: text }} />;
  };
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout siteTitleUrl="/career" transparentHeader={true}>
        <SEO
          imageUrl={pageContext.socialCardImage}
          title={`Karriere - ${pageContext.position.name} | Satellytes`}
          description={`Bewirb dich jetzt als ${pageContext.position.name}! Schaue Dir unsere anderen offenen Stelle an. Wir freuen uns auf Deine Bewerbung.`}
        />
        <Grid>
          <GridItem xs={12} md={8}>
            <Title>{pageContext.position.name}</Title>
            <IntroText text={intro?.value} />
            {descriptions.map(({ name, value }) => {
              return (
                <div key={name}>
                  <SectionTitle>{name}</SectionTitle>
                  <PersonioHtml dangerouslySetInnerHTML={{ __html: value }} />
                </div>
              );
            })}
          </GridItem>

          <GridItem xs={12} md={8}>
            <SectionTitle>Bewirb dich jetzt</SectionTitle>
            <CareerForm
              company_id="41230"
              recruiting_channel_id="329206"
              access_token="89b2acfa3a239b75c7d6"
              job_position_id={pageContext.position.id + ''}
            />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default CareerPage;
