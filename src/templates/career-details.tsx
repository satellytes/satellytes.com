import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';
import { PersonioJobPosition } from './career';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { LargeText, TextTitle } from '../components/typography/typography';
import { CareerForm } from '../components/career-form/career-form';

const PERSONIO_SHORT_DESCRIPTION_NAME = 'Kurzbeschreibung';

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;
  color: #202840;

  margin-top: 105px;
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: 145px;
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
  };
}

const CareerPage = ({ pageContext }: CareerPageProps): JSX.Element => {
  const descriptions = pageContext.position.jobDescriptions.jobDescription;

  return (
    <Layout siteTitleUrl="/career">
      <SEO
        title={`Karriere - ${pageContext.position.name} | Satellytes`}
        description={`Wir suchen nach ${pageContext.position.name}! Schaue Dir unsere offene Stelle an. Wir freuen uns auf Deine Bewerbung.`}
      />
      <Grid>
        <GridItem xs={12} md={8}>
          <Title>{pageContext.position.name}</Title>
          {descriptions.map(({ name, value }) => {
            // the short description is only used on the career page
            if (name === PERSONIO_SHORT_DESCRIPTION_NAME) {
              return null;
            }

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
  );
};

export default CareerPage;
