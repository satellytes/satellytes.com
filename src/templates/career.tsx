import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  LargeText,
  PageTitle,
  SectionTitle,
  Text,
  TextLink,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';
import { JobCard } from '../components/cards/job-card';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const PositionsTitle = styled(SectionTitle)`
  font-size: 24px;
  margin: 80px 0 24px 0;

  ${up('md')} {
    font-size: 32px;
    margin: 120px 0 32px 0;
  }
`;

const InfoText = styled(Text)`
  font-size: 18px;
  a {
    font-size: 18px;
  }

  margin-top: 8px;
`;

interface CareerQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

interface PersonioJobNameValue {
  name: string;
  value: string;
}

export interface PersonioJobPosition {
  id: string;
  office: string;
  department: string;
  name: string;
  jobDescriptions: {
    jobDescription: PersonioJobNameValue[];
  };
  employmentType: string;
  seniority: string;
  schedule: string;
  // comma separated
  keywords: string;

  satellytesPath: string;
  satellytesShortDescription: string;
}

interface CareerPageProps {
  pageContext: {
    positions: PersonioJobPosition[];
  };
}

const CareerPage = ({ pageContext }: CareerPageProps): JSX.Element => {
  const data = useStaticQuery<CareerQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/career)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO
        title="Karriere | Satellytes"
        description="Wir suchen Entwickler:innen aus Leidenschaft! Schaue Dir unsere offenen Stellen an. Wir freuen uns auf Deine Bewerbung."
      />
      <Grid>
        <GridItem>
          <PageTitle>Karriere</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <LargeText as={'h2'}>
            Wir suchen Entwickler:innen aus Leidenschaft!
          </LargeText>
          <Markdown>{data.markdownRemark.rawMarkdownBody}</Markdown>
          <PositionsTitle>Unsere offene Stellen</PositionsTitle>
        </GridItem>
        <GridItem xs={0} md={4} />
        {pageContext.positions.map((position) => (
          <GridItem xs={12} md={4} key={position.id}>
            <JobCard
              title={position.name}
              text={position.satellytesShortDescription}
              link={position.satellytesPath}
            />
          </GridItem>
        ))}
        <GridItem xs={12}>
          <InfoText>
            Oder schicke deine Bewerbung an:{' '}
            <TextLink to="mailto:career@satellytes.com">
              career@satellytes.com
            </TextLink>
          </InfoText>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CareerPage;
