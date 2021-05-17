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
// import Img from "gatsby-image"
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
const BottomNote = styled(Text)`
  margin-top: 80px;
  opacity: 0.8;
`;

import { graphql, Link } from 'gatsby';

export const query = graphql`
  {
    file(relativePath: { eq: "office/_MG_1402.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`;
/**
 * We can't wrap StaticImage as it doesn't support higher order functions.
 * See https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#using-staticimage-with-css-in-js-libraries
 */
const OfficeImageWrapper = styled.div`
  margin-bottom: 24px;
`;

const OfficePage = () => {
  return (
    <Layout>
      <SEO title="Office | Satellytes" />
      <Grid>
        <GridItem>
          <PageTitle>Unser Büro</PageTitle>
        </GridItem>

        <GridItem xs={12} md={8}>
          <LargeText>
            Fühl dich wohl bei uns. Ein kleiner Eindruck von unserem Büro in der
            Sendlinger Straße im Herzen Münchens.
          </LargeText>
        </GridItem>

        <GridItem>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-01.jpg"
              width={1200}
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-02.jpg"
              width={1200}
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-03.jpg"
              width={1200}
            />
          </OfficeImageWrapper>
          <OfficeImageWrapper>
            <StaticImage
              layout={'constrained'}
              alt={''}
              src="../images/office/sy-office-04.jpg"
              width={1200}
            />
          </OfficeImageWrapper>
        </GridItem>
        <GridItem>
          <Text>
            Wenn du mit uns in diesem Office arbeiten möchtest, dann schau dir
            doch unsere <TextLink to={'/career'}>offenen Stellen</TextLink> an.
          </Text>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default OfficePage;
