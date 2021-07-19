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
import { graphql } from 'gatsby';
import { JobCard } from '../components/cards/job-card';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { Aurora, AuroraType } from '../components/aurora/aurora';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

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
  htmlAst: string;
  fields: {
    socialCard: string;
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
    language: string;
  };
  data: {
    markdownRemark: CareerQuery;
    locales: {
      edges: {
        node: {
          ns: string;
          language: string;
          data: string;
        };
      }[];
    };
  };
}

const CareerPage = ({ pageContext, data }: CareerPageProps): JSX.Element => {
  const { t } = useTranslation();

  const socialCard = data.markdownRemark?.fields?.socialCard;
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout transparentHeader={true} showLanguageSwitch>
        <SEO
          imageUrl={socialCard}
          title="Karriere | Satellytes"
          description="Wir suchen Entwickler:innen aus Leidenschaft! Schaue Dir unsere offenen Stellen an. Wir freuen uns auf Deine Bewerbung."
        />
        <Grid>
          <GridItem>
            <PageTitle>{t('career.title')}</PageTitle>
          </GridItem>
          <GridItem xs={12} md={8}>
            <LargeText as={'h2'}>{t('career.subheading')}</LargeText>
            <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
            <PositionsTitle>{t('career.title-positions')}</PositionsTitle>
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
            <Trans i18nKey={'career.actions.alternative'}>
              <InfoText>
                Oder schicke deine Bewerbung an:{' '}
                <TextLink to="mailto:career@satellytes.com">
                  career@satellytes.com
                </TextLink>
              </InfoText>
            </Trans>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default CareerPage;

export const query = graphql`
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
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/career)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
      fields {
        socialCard
      }
      frontmatter {
        title
        language
      }
    }
  }
`;
