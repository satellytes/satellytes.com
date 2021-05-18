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
import { graphql, useStaticQuery } from 'gatsby';
import { JobCard } from '../components/cards/job-card';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';

const PositionsTitle = styled(SectionTitle)`
  font-size: 24px;
  margin: 80px 0 24px 0;

  ${up('md')} {
    font-size: 32px;
    margin: 120px 0 32px 0;
  }
`;

const JobCardGridItem = styled(GridItem)`
  height: 100%;
  padding-bottom: 24px;
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
    htmlAst: string;
    fields: {
      socialCard: string;
    };
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
        htmlAst
        fields {
          socialCard
        }
      }
    }
  `);

  const socialCard = data.markdownRemark?.fields?.socialCard;
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true}>
        <SEO
          imageUrl={socialCard}
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
            <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
            <PositionsTitle>Unsere offenen Stellen</PositionsTitle>
          </GridItem>
          <GridItem xs={0} md={4} />
          {pageContext.positions.map((position) => (
            <JobCardGridItem xs={12} sm={6} md={4} lg={3} key={position.id}>
              <JobCard
                title={position.name}
                text={position.satellytesShortDescription}
                link={position.satellytesPath}
              />
            </JobCardGridItem>
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
    </>
  );
};

export default CareerPage;
