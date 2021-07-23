import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  LargeText,
  PageTitle,
  Text,
  TextLink,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { up } from '../components/breakpoint/breakpoint';
import { graphql } from 'gatsby';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useI18next } from 'gatsby-plugin-react-i18next';

/**
 * We can't wrap StaticImage as it doesn't support higher order functions.
 * See https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#using-staticimage-with-css-in-js-libraries
 */
const OfficeImageWrapper = styled.div`
  margin-bottom: 24px;
`;

const Intro = styled(LargeText)`
  margin-bottom: 80px;

  ${up('md')} {
    margin-bottom: 160px;
  }
`;

const OfficePage = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  return (
    <Layout showLanguageSwitch>
      <SEO title="Office | Satellytes" />
      <Grid>
        <GridItem>
          <PageTitle>{t('office.title')}</PageTitle>
        </GridItem>

        <GridItem xs={12} md={8}>
          <Intro>{t('office.subheading')}</Intro>
        </GridItem>

        <GridItem>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-01.jpg"
              width={1200}
              placeholder="blurred"
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-02.jpg"
              width={1200}
              placeholder="blurred"
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-03.jpg"
              width={1200}
              placeholder="blurred"
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-04.jpg"
              width={1200}
              placeholder="blurred"
            />
          </OfficeImageWrapper>
        </GridItem>
        <GridItem>
          <Trans i18nKey="office.link">
            <Text>
              Wenn du mit uns in diesem Office arbeiten möchtest, dann schau dir
              doch unsere
              <TextLink to={'/career/'} language={language}>
                offenen Stellen
              </TextLink>
              an.
            </Text>
          </Trans>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default OfficePage;

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
  }
`;
